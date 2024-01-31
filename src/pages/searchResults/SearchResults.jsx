import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import "./style.scss"
import { fetchDataFromApi } from '../../utils/api'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import MovieCart from '../../components/movieCart/MovieCart'
import Spinner from '../../components/spinner/Spinner'
import noResults from '../../assets/no-results.png'

const SearchResults = () => {
    const [data, setData] = useState(null)
    const [pagNum, setPagNum] = useState(1)
    const [loading, setLoading] = useState(false)
    const { query } = useParams()

    const fetchInitialData = () => {
        setLoading(true)
        fetchDataFromApi(`/search/multi?query=${query}&page=${pagNum}`)
            .then((res) => {
                setData(res)
            })
        setPagNum((prev) => prev + 1)
        setLoading(false)
    }

    const fetchNextPageData = () => {
        fetchDataFromApi(`/search/multi?query=${query}&page=${pagNum}`)
            .then((res) => {
                if (data?.results) {
                    setData({ ...data, results: [...data?.results, ...res.results] })
                }
                else {
                    setData(res)
                }
                setPagNum((prev) => prev + 1)
            })
    }

    useEffect(() => {
        setPagNum(1)
        fetchInitialData()
    }, [query])
    return (
        <div className='searchResultsPage'>
            {
                loading && <Spinner initial={true} />
            }
            {!loading && (
                <ContentWrapper>
                    {
                        data?.results?.length > 0 ?
                            <>
                                <div className="pageTitle">
                                    {`Search ${data?.total_results > 1 ? "results" : 'result'} of '${query}'`}
                                </div>
                                <InfiniteScroll className="content" dataLength={data?.results?.length || []} next={fetchNextPageData} hasMore={pagNum <= data?.total_pages} loader={<Spinner />} endMessage={
                                    <p className='pageDone' style={{ textAlign: 'center', color: 'white', fontSize: '20px', width: '100%' }}>
                                        <b>Yay! All Results Shown</b>
                                    </p>
                                }>
                                    {
                                        data?.results?.map((item, index) => {
                                            if (item.media_type === 'person') return
                                            return (
                                                <MovieCart key={index} data={item} fromSearch={true} />
                                            )
                                        })
                                    }
                                </InfiniteScroll>
                            </> : <> <p style={{ color: 'white', fontSize: '20px', textAlign: 'center', marginBottom: '40px' }}>Result Not Found!</p></>
                    }
                </ContentWrapper>
            )}
        </div>
    )
}

export default SearchResults