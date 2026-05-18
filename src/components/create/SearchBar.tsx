import axios from "axios";
import { useEffect, useState } from "react";
import classes from "./SearchBar.module.css";
import { Search } from "lucide-react";
import type { sharedWithType } from "./Settings";

type UserDetails = {
  name: string;
  email: string;
};

const SearchBar: React.FC<{
  onItemClick: (newUser: sharedWithType) => void;
}> = (props) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserDetails[]>([]);
//   const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim().length <= 2) {
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
    // setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/user/search", {
        params: { q: searchTerm },
        signal,
      });
      setResults(response.data.data?.users || []);
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      }
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
    //   setLoading(false);
    }
  };

  return (
    <div className={classes["search-container"]}>
      <div className={classes["input-wrapper"]}>
        <Search size={18} className={classes["search-icon"]} />
        <input
          type="text"
          placeholder="הכנס מייל או שם..."
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
              onClick={() =>
                props.onItemClick({ ...user, permission: "צפייה" })
              }
            >
              <span>{user.name}</span>
              <small>{user.email}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
