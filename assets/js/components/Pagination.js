import React from "react";

const Pagination = ({currentPage, itemsPerPage, length, onPageChanged}) => {

    const pagesCount = Math.ceil(length / itemsPerPage);
    const pages = [];
  
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }

  return (
    <div>
      <ul className="pagination pagination-sm">
        <li className={"page-item " + (currentPage === 1 && " disabled")}>
          <button className="page-link" onClick={() => onPageChanged(1)}>
            &laquo;&laquo;
          </button>
        </li>
        <li className={"page-item " + (currentPage === 1 && " disabled")}>
          <button
            className="page-link"
            onClick={() => onPageChanged(currentPage - 1)}
          >
            &laquo;
          </button>
        </li>
        {pages.map((page) => (
          <li
            className={"page-item " + (currentPage === page && "active")}
            key={page}
          >
            <button
              onClick={() => onPageChanged(page)}
              className="page-link"
            >
              {page}
            </button>
          </li>
        ))}

        <li
          className={"page-item " + (currentPage === pagesCount && " disabled")}
        >
          <button
            className="page-link"
            onClick={() => onPageChanged(currentPage + 1)}
          >
            &raquo;
          </button>
        </li>
        <li
          className={"page-item " + (currentPage === pagesCount && " disabled")}
        >
          <button
            className="page-link"
            onClick={() => onPageChanged(pagesCount)}
          >
            &raquo;&raquo;
          </button>
        </li>
      </ul>
    </div>
  );
};

Pagination.getData = (items, currentPage, itemsPerPage) =>{
    //d'où on part (start) pendant combien (itemsPerPage)
  const start = currentPage * itemsPerPage - itemsPerPage;
  return items.slice(start, start + itemsPerPage);
}

export default Pagination;
