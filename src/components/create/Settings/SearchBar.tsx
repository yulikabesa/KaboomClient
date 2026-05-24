import axios from "axios";
import { useEffect, useRef, useState } from "react";
import classes from "./SearchBar.module.css";
import { Search } from "lucide-react";

type UserDetails = {
  name: string;
  email: string;
};

type TagDetails = {
  name: string;
};

type SearchBarProps<T> = {
  onItemClick: (item: T) => void;
  placeHolder: string;
  searchFor: "tag" | "user";
};

const SearchBar = <T,>(props: SearchBarProps<T>) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserDetails[] | TagDetails[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      const response = await axios.get(
        `http://localhost:3000/${props.searchFor}/search`,
        {
          params: { q: searchTerm },
          signal,
        },
      );
      if (props.searchFor === "user") {
        setResults(response.data.data?.users || []);
      } else {
        setResults(response.data.data?.tags || []);
      }
      if (query.trim().length > 1 && results.length === 0) {
        setResults([{ name: "לא נמצאו תוצאות" }]);
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      }
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className={classes["search-container"]} ref={containerRef}>
      <div className={classes["input-wrapper"]}>
        <Search size={18} className={classes["search-icon"]} />
        <input
          type="text"
          placeholder={props.placeHolder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {results.length > 0 && (
        <ul className={classes["results-list"]}>
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
              }}
            >
              <span>{user.name}</span>
              {"email" in user && user.email && <small>{user.email}</small>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
