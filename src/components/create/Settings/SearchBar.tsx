import axios from "axios";
import { useEffect, useRef, useState } from "react";
import classes from "./SearchBar.module.css";
import { Search } from "lucide-react";
import { searchData } from "../../../api/searchApi";
import type { UserDetails, TagDetails } from "../../../types/quiz";
import { createPortal } from "react-dom";

type SearchBarProps<T> = {
  onItemClick: (item: T) => void;
  placeHolder: string;
  searchFor: "tag" | "user";
};

const SearchBar = <T,>(props: SearchBarProps<T>) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserDetails[] | TagDetails[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const updateDropdownPosition = () => {
    if (!inputWrapperRef.current || !dropdownRef.current) return;
    const rect = inputWrapperRef.current.getBoundingClientRect();
    const el = dropdownRef.current;
    el.style.top = `${rect.bottom + 4}px`;
    el.style.left = `${rect.left}px`;
    el.style.width = `${rect.width}px`;
  };

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        containerRef.current?.contains(target) ||
        dropdownRef.current?.contains(target)
      ) {
        return;
      }
      setResults([]);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (results.length > 0) {
      requestAnimationFrame(updateDropdownPosition);
    }
  }, [results]);

  useEffect(() => {
    if (!results.length) return;
    let rafId: number;
    const handle = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateDropdownPosition);
    };
    window.addEventListener("scroll", handle, true);
    window.addEventListener("resize", handle);
    return () => {
      window.removeEventListener("scroll", handle, true);
      window.removeEventListener("resize", handle);
    };
  }, [results]);

  useEffect(() => {
    if (query.trim().length <= 1) {
      setResults([]);
      return;
    }
    const controller = new AbortController();
    const delayDebounceFn = setTimeout(() => {
      fetchServerData(query, controller.signal);
    }, 500);

    return () => {
      clearTimeout(delayDebounceFn);
      controller.abort();
    };
  }, [query]);

  const fetchServerData = async (searchTerm: string, signal: AbortSignal) => {
    try {
      const data = await searchData(props.searchFor, searchTerm, signal);
      const key = props.searchFor === "user" ? "users" : "tags";
      const responseResults = data.data?.[key] || [];
      setResults(
        query.trim().length > 1 && responseResults.length === 0
          ? [{ name: "לא נמצאו תוצאות" }]
          : responseResults,
      );
    } catch (error) {
      if (axios.isCancel(error)) return;
      console.error(error);
    }
  };

  return (
    <div className={classes["search-container"]} ref={containerRef}>
      <div className={classes["input-wrapper"]} ref={inputWrapperRef}>
        <Search size={18} className={classes["search-icon"]} />
        <input
          type="text"
          placeholder={props.placeHolder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {results.length > 0 &&
        createPortal(
          <ul
            ref={dropdownRef}
            className={classes["results-list"]}
            style={{
              position: "fixed",
              zIndex: 999999,
            }}
          >
            {results.map((user, index) => (
              <li
                key={index}
                className={classes["result-item"]}
                onClick={() => {
                  if (props.searchFor === "user") {
                    props.onItemClick({
                      ...user,
                      permission: "צפייה",
                    } as T);
                  } else {
                    props.onItemClick(user as T);
                  }

                  setResults([]);
                  setQuery("");
                }}
              >
                <span>{user.name}</span>
                {"email" in user && user.email && <small>{user.email}</small>}
              </li>
            ))}
          </ul>,
          document.getElementById("overlay")!,
        )}
    </div>
  );
};

export default SearchBar;
