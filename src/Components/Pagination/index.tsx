import React, { JSX } from "react";
import "./style.css";

interface PaginationProps {
    page: number;
    totalPages: number;
    handlePageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, handlePageChange }) => {
    const renderPagination = () => {
        const pages: JSX.Element[] = [];

        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={page === i ? "active" : ""}
                    id="pagination_numbers"
                >
                    {i}
                </button>
            );
        }

        return pages;
    };

    return (
        <div className="pagination">
            {/* Botão da seta esquerda sempre visível, mas desativado na primeira página */}
            <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className={`pagination-button ${page === 1 ? "disabled" : ""}`}
            >
                <svg width="9" height="19" viewBox="0 0 11 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 1L1 10.5L10 20" stroke="#909090" strokeWidth="2" strokeLinecap="round" strokeLinejoin="bevel" />
                </svg>
            </button>

            {renderPagination()}

            {/* Botão da seta direita sempre visível, mas desativado na última página */}
            <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className={`pagination-button ${page === totalPages ? "disabled" : ""}`}
            >
                <svg width="9" height="19" viewBox="0 0 11 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.999999 20L10 10.5L1 0.999998" stroke="#909090" strokeWidth="2" strokeLinecap="round" strokeLinejoin="bevel" />
                </svg>
            </button>
        </div>
    );
};

export default Pagination;
