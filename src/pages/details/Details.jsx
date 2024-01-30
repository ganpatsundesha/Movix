import React from 'react'
import "./style.scss"
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import DetailsBanner from './detailsBanner/DetailsBanner'
import Cast from './cast/Cast'
import VideosSection from './videoSection/VideosSection'
import Similar from './carousels/Similar'
import Recommendation from './carousels/Recmmendation'

const Details = () => {
    const { mediaType, id } = useParams()
    const { data, loading } = useFetch(`/${mediaType}/${id}/videos`)
    const { data: creadits, loading: creaditsLoading } = useFetch(`/${mediaType}/${id}/credits`)

    return (
        <div>
            <DetailsBanner video={data?.results?.[0]} crew={creadits?.crew} />
            <Cast data={creadits?.cast} loading={creaditsLoading} />
            <VideosSection data={data} loading={loading} />
            <Similar mediaType={mediaType} id={id} />
            <Recommendation mediaType={mediaType} id={id} />
        </div>
    )
}

export default Details