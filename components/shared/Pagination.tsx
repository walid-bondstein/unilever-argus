import { useEffect, useState } from "react";
export default function Paginate({ currentPage, lastPage, handlePageChange, dataMark }: {
    currentPage: number;
    lastPage: number;
    handlePageChange: (page: number) => void;
    dataMark?: {
        perPage: number;
        totalItem: number;
    }
}) {
    const [paginateArr, setPaginateArr] = useState<(null | number)[]>([]);
    useEffect(() => {
        let paginateArray: (null | number)[] = [];
        if (lastPage < 6) {
            for (let i = 1; i <= lastPage; i++) {
                paginateArray.push(i);
            }
        } else {
            if (currentPage < 3) {
                paginateArray = [1, 2, 3, null, lastPage - 1, lastPage];
                console.log(paginateArray);
            } else if (currentPage < lastPage - 2) {
                paginateArray = [
                    1,
                    null,
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    null,
                    lastPage,
                ];
            } else {
                paginateArray = [1, 2, null, lastPage - 2, lastPage - 1, lastPage];
            }
        }
        setPaginateArr(paginateArray);
    }, [lastPage, currentPage]);
    function getPaginationLabel({
        currentPage,
        perPage,
        totalItems
    }: {
        currentPage: number;
        perPage: number;
        totalItems: number;
    }) {
        if (totalItems === 0) return "Showing 0–0 out of 0";

        const from = (currentPage - 1) * perPage + 1;
        const to = Math.min(currentPage * perPage, totalItems);

        return `Showing ${from}–${to} out of ${totalItems}`;
    }
    if (!currentPage || !lastPage || currentPage < 1 || lastPage < 1) {
        return <div></div>;
    }
    return (
        <div className="flex items-center justify-between flex-wrap w-full">
            {dataMark && <div>
                <p className="text-gray-500 text-sm">
                    {getPaginationLabel({
                        currentPage,
                        perPage: dataMark.perPage || 0, // Assuming 10 items per page, adjust as necessary
                        totalItems: dataMark.totalItem // Assuming 10 items per page, adjust as necessary
                    })}
                </p>
            </div>}
            <div className="flex align-center justify-end my-2 mx-2 gap-0.5">
                {paginateArr.map((page, index) => {
                    return (
                        /* eslint-disable react/jsx-props-no-spreading */
                        <div
                            key={index}
                            onClick={() => {
                                if (page) {
                                    handlePageChange(page);
                                }
                            }}
                            className={`transition-all md:text-[14px] text-sm hover:bg-primary/70 rounded-sm duration-300 md:h-[36px] h-[25px] md:min-w-[36px] w-[25px] px-0.5 cursor-pointer flex items-center justify-center ${currentPage == page
                                ? "bg-primary/70 font-bold"
                                : "group-hover:font-bold "
                                } `}
                        >
                            {page ? page : "..."}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
