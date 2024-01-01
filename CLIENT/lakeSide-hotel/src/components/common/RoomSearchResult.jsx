import React from 'react';
import { useState } from 'react';
import { Row, Button } from 'react-bootstrap';
import RoomCard from '../room/RoomCard';
import RoomPaginator from './RoomPaginator';


const RoomSearchResult = ({results,onClearSearch}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const resultPerPage = 3;
    const totalResults = results.length;
    const totalPages = Math.ceil(totalResults / resultPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const startIndex = (currentPage - 1) * resultPerPage;
    const endIndex = startIndex + resultPerPage;
    const paginatedResults = results.slice(startIndex, endIndex);

    return (
        <>
            {results.length > 0 ? (
                <>
                    <h5 className='text-center mt-5 mb-3 hotel-color'>Search Results</h5> <hr />

                    <Row>
                        {paginatedResults.map((room) => (
                            <RoomCard key={room.id} room={room} />
                        ))}
                    </Row>

                    <Row>
                       {totalResults > resultPerPage && (
                           <RoomPaginator
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                           />
                       )}
                          <div className='align-items-center text-center'>
                          <Button 
                            variant='secondary'
                            onClick={onClearSearch}
                            className='btn-hotel'>
                                Clear Search
                            </Button>
                          </div>
                    </Row>
                </>
            ):(
                <p> </p>
            )
            }           
        </>
    );
};

export default RoomSearchResult;
 