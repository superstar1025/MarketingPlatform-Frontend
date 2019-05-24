import React from "react";
import { FixedSizeList, ListOnItemsRenderedProps } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { SizeMe } from "react-sizeme";
import isNumber from "lodash/fp/isNumber";

import LoadingDots from "./LoadingDots";

interface Props {
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  items: any[];
  loadNextPage: (startIndex: number, stopIndex: number) => void;
  rowComponent: React.ComponentType<{
    content: any;
    style: { [key: string]: any };
  }>;
  headerComponent: React.ComponentType<{ [key: string]: any }>;
}

const WindowedList = ({
  hasNextPage,
  isNextPageLoading,
  items,
  loadNextPage,
  rowComponent: RowComponent,
  headerComponent: HeaderComponent
}: Props) => {
  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const itemCount = hasNextPage ? items.length + 1 : items.length;
  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;
  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index: number) => !hasNextPage || index < items.length;
  // Render an item or a loading indicator.
  const Item = ({
    index,
    style
  }: {
    index: number;
    style: { [key: string]: any };
  }) => {
    const isLoading = !isItemLoaded(index);

    if (isLoading) {
      return (
        <div style={style}>
          <LoadingDots className="loading-dots-dark" />
        </div>
      );
    }
    return <RowComponent key={index} style={style} content={items[index]} />;
  };

  return (
    <div className="table">
      <HeaderComponent />
      <SizeMe monitorHeight monitorWidth>
        {({ size }: { size: { height: number; width: number } }) => {
          return (
            isNumber(size.height) &&
            isNumber(size.width) && (
              <div
                style={{ position: "relative", height: "100%", flexGrow: 1 }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: size.height
                  }}
                >
                  <InfiniteLoader
                    isItemLoaded={isItemLoaded}
                    itemCount={itemCount}
                    loadMoreItems={loadMoreItems}
                  >
                    {({
                      onItemsRendered,
                      ref
                    }: {
                      onItemsRendered: (p: ListOnItemsRenderedProps) => void;
                      ref: React.RefObject<FixedSizeList>;
                    }) => (
                      <FixedSizeList
                        className="row-collection"
                        itemCount={itemCount}
                        onItemsRendered={onItemsRendered}
                        ref={ref}
                        itemSize={70}
                        height={size.height}
                        width={size.width}
                      >
                        {Item}
                      </FixedSizeList>
                    )}
                  </InfiniteLoader>
                </div>
              </div>
            )
          );
        }}
      </SizeMe>
    </div>
  );
};

export default WindowedList;
