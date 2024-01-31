import React, { useState, useRef } from "react";

import "./style.scss";

import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { PlayIcon } from "../PlayIcon";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import ImgComp from "../../../components/lazyLoadImage/ImgComp";

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const carouselContainer = useRef()

    const navigation = (direction) => {
        const container = carouselContainer.current;

        const scrollAmount = direction === "left" ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20)

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        })
    }

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <>
            {
                data?.results?.length > 0 ? <><div className="videosSection">
                    <ContentWrapper >
                        <div className="sectionHeading">Official Videos</div>
                        {
                            data?.results?.length > 3 ? <>
                                <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={() => navigation("left")} />
                                <BsFillArrowRightCircleFill className="carouselRighttNav arrow" onClick={() => navigation("right")} />
                            </> : <></>
                        }
                        {!loading ? (
                            <div className="videos" ref={carouselContainer}>
                                {
                                    data?.results?.map((video) => {
                                        return (
                                            <div key={video.id} className="videoItem" onClick={() => {
                                                setVideoId(video.key)
                                                setShow(true)
                                            }}>
                                                <div className="videoThumbnail">{<ImgComp src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} />} <PlayIcon /></div>
                                                <div className="videoTitle">{video.name}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ) : (
                            <div className="videoSkeleton">
                                {loadingSkeleton()}
                                {loadingSkeleton()}
                                {loadingSkeleton()}
                                {loadingSkeleton()}
                            </div>
                        )
                        }
                    </ContentWrapper >
                    <VideoPopup
                        show={show}
                        setShow={setShow}
                        videoId={videoId}
                        setVideoId={setVideoId}
                    />
                </div ></> : <></>
            }
        </>
    );
};

export default VideosSection;