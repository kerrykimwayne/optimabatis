import React from 'react'
import { Pagination } from 'react-bootstrap'

export default function Pagin({ setPage, data, page, totalPages }) {
    return (
        <Pagination>
            <Pagination.Prev onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={data && !data.previous} />
            {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item key={index + 1} active={index + 1 === page} onClick={() => setPage(index + 1)}>
                    {index + 1}
                </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={data && !data.next} />
        </Pagination>
    )
}
