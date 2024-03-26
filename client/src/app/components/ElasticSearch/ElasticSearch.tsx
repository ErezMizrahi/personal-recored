import React, { ChangeEvent, useState } from "react";
import { CinputText } from "../styled/CInputText.styled";
import { debounce } from "../../utils/utils";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import "./index.css";

interface Props {
  selectedItems: Record<string, any>[];
  setSelectedItems: React.Dispatch<React.SetStateAction<Record<string, any>[]>>;
}
function ElasticSearch({ selectedItems, setSelectedItems }: Props) {
  const [results, setResults] = useState<Record<string, any>[]>([]);
  const [isResultsDisplayed, setIsResultsDisplayed] = useState<boolean>(false);

  const onChangeText = async (event: ChangeEvent<HTMLInputElement>) => {
    await debounce(async () => {
      const name = event.target.value;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name }),
      };
      if (name.length) {
        const response = await fetch("/api/exercises/search", requestOptions);
        const data = (await response.json()) as Record<string, any>[];

        setResults(data || []);
        setIsResultsDisplayed(true);
      } else {
        setResults([]);
        setIsResultsDisplayed(false);
      }
    }, 300);
  };
  const closeResults = () => {
    setIsResultsDisplayed(false);
  };

  const onSelectItem = (exName: string) => {
    const itemExists = selectedItems.some((item) => item.name === exName);

    if (itemExists) {
      const tmp = selectedItems.filter((item) => item.name !== exName);
      setSelectedItems(tmp);
    } else {
      const selectedItem = results.find((item) => item.name === exName);
      if (selectedItem) {
        const tmp = [...selectedItems, selectedItem];
        setSelectedItems(tmp);
      }
    }
  };

  return (
    <div className="main-container">
      <div className="search-container" onBlur={() => closeResults()}>
        <CinputText onChange={onChangeText} placeholder="Search" />
        {results.length > 0 && isResultsDisplayed && (
          <div className="results">
            {results?.map((ex) => (
              <div
                onMouseDown={(e) => {
                  e.preventDefault();
                  onSelectItem(ex.name);
                }}
                className={
                  selectedItems.find((item) => item.name === ex.name)
                    ? "selected-item"
                    : "item"
                }
              >
                {ex.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ElasticSearch;
const styles = {};
