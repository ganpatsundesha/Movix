import React from 'react'
import "./style.scss"
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import DetailsBanner from './detailsBanner/DetailsBanner'

const Details = () => {
    const { mediaType, id } = useParams()
    const { data, loading } = useFetch(`/${mediaType}/${id}/videos`)
    const { data: creadits, loading: creaditsLoading } = useFetch(`/${mediaType}/${id}/credits`)



    return (
        <div>
            <DetailsBanner video={data?.results?.[0]} crew={creadits?.crew} />
        </div>
    )
}

export default Details