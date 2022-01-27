import React, { useState, useEffect } from 'react';

import SwiperCore, { Autoplay } from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import Button from '../Button/Button';

import apiConfig from '../../api/apiConfig';
import userService from '../../api/services/user.service';



import './hero-slide.css';
import { useHistory } from 'react-router';

const HeroSlide = () => {

    SwiperCore.use([Autoplay]);

    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            try{
                const response = await userService.getMoviesList();
                setMovieItems(response.slice(0, 3));
                
            }catch{
                console.log('error');
                
            }
        
        }
        getMovies();
    },[]);
    return (
        <div className = "hero-slide">
            <Swiper 
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{delay: 3000}}
            > 
                {
                    movieItems.map((item, i) => (
                        <SwiperSlide key={i}>
                            {({isActive}) => (
                                <HeroSlideitem item={item} className={`${isActive ? 'active' : ''}`} /
                                >
                            )}

                        </SwiperSlide>

                    ))
                }
                

            </Swiper>
        </div>
    )
}

const HeroSlideitem = props => {
    let history = useHistory();
    const item = props.item;

    const background = apiConfig.originalImage(item.image ? item.image: item.image);

    return (
        <div
            className={`hero-slide__item ${props.className}`}
            style = {{backgroundImage: `url(${background})`}}
        >
            <div className = "hero-slide__item__content container">
                <div className = "hero-slide__item__content__info">
                    <h2 className = "title">{item.title}</h2>
                    <div className = "synopsis">{item.synopsis}</div>
                    <div className='btns'>
                        <Button onClick={() => history.push('/movies/'+item.idMovie)}>
                            Ver Detalles
                        </Button>
                    </div>
                </div>
                <div className = "hero-slide__item__content__poster">
                    <img src = {apiConfig.originalImage(item.image)} alt="" />
                </div>
            </div>

        </div>
    )
}

export default HeroSlide;
