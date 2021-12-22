import React, {useEffect} from 'react';
import Pagination from "react-bootstrap/Pagination";

function ItemPagination({
                            lastItem = -1,
                            firstItem = 1,
                            numberOfPagesToRender = 4,
                            shouldIncludeNext = true,
                            shouldIncludePrevious = true,
                            shouldIncludeEllipsis = true,
                        }) {

    //region Rendering
    const renderEllipsis = () => {
        if (shouldIncludeEllipsis) return (
            <>
                <Pagination.Ellipsis onClick={(e) => handlePaginationClick(e)}/>
            </>
        );
        return null;
    }

    const renderNextItems = () => {
        if (shouldIncludePrevious) return (
            <>
                <Pagination.Next onClick={(e) => handlePaginationClick(e)}/>
                <Pagination.Last onClick={(e) => handlePaginationClick(e)}/>
            </>
        );
        return null;
    }

    const renderPageItems = () => {
        const middleItem = Math.ceil((lastItem - firstItem) / 2);
        if (middleItem === firstItem || middleItem === lastItem) return null;

        const offsetRight = Math.ceil(numberOfPagesToRender / 2);
        const offsetLeft = numberOfPagesToRender - offsetRight;
        const startingPageNumber = middleItem - offsetLeft;
        const endingPageNumber = middleItem + offsetRight;

        const toReturn = [];
        for (let i = startingPageNumber; i <= endingPageNumber; i++) {
            toReturn.add(<Pagination.Item active={middleItem === i}>{i}</Pagination.Item>);
        }
    }

    const renderPreviousItems = () => {
        if (shouldIncludePrevious) return (
            <>
                <Pagination.First onClick={(e) => handlePaginationClick(e)}/>
                <Pagination.Prev onClick={(e) => handlePaginationClick(e)}/>
            </>
        );
        return null;
    }
    //endregion

    //region Event Handlers
    const handlePaginationClick = (e) => {
        console.log(e.target.textContent);
    }

    const onLoad = () => {
        console.table({
            lastItem,
            firstItem,
            numberOfPagesToRender,
            shouldIncludeNext,
            shouldIncludePrevious,
            shouldIncludeEllipsis,
        })
    }

    useEffect(onLoad, [])

    return (
        <Pagination>
            {renderPreviousItems()}
            <Pagination.Item onClick={(e) => handlePaginationClick(e)}>{firstItem}</Pagination.Item>
            {renderEllipsis()}
            {renderPageItems()}
            {renderEllipsis()}
            <Pagination.Item onClick={(e) => handlePaginationClick(e)}>{lastItem}</Pagination.Item>
            {renderNextItems()}
        </Pagination>
    );
}

export default ItemPagination;