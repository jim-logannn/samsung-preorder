import { useTheme } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useWindowDimensions from '@smt/hook/layout/useWindowDimensions';
import { SwiperClass } from '@smt/type/swiper';
import React, { useCallback } from 'react';
import SwiperCore, { Navigation, Controller, SwiperOptions } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';

SwiperCore.use([Navigation, Controller]);

const DEFAULT_NAVIGATION = {};

const swiperOption = (width: number): SwiperOptions => {
	const spaceBetween = 0;
	const slidesPerView = width >= 1024 ? 3 : 2.5;
	const autoHeight = false;
	const centeredSlides = width < 768;
	const watchSlidesProgress = true;
	return {
			spaceBetween,
			slidesPerView,
			autoHeight,
			centeredSlides,
			watchSlidesProgress,
	};
};

export const Default: React.FC<{navigation?: Record<string, string>, swiperCallback?: Record<string, (swiper: SwiperClass) => void>}> = ({ children, navigation = DEFAULT_NAVIGATION, swiperCallback }) => {
	
	const { width } = useWindowDimensions();
	const responsiveSwiperOption = swiperOption(width);

	return <Swiper
		navigation={navigation}
		{...responsiveSwiperOption}
		{...swiperCallback}
	>
		{children}
	</Swiper>
}

export { SwiperSlide };