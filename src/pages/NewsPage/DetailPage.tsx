import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetDetailNewsQuery,
  useGetNewsQuery,
} from '../../redux/apis/newsApi';
import { IoIosArrowBack } from 'react-icons/io';
import Profile from '../../Components/News/DetailPage/Profile';
import './style.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import { fromNowHour } from '../../utils/dayjs';

const DetailPage = () => {
  const newsId = Number(useParams().newsId) || 0;
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetDetailNewsQuery(newsId);
  const { data: NewsData } = useGetNewsQuery({});

  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  }
  if (error) {
    content = <div>Network Error...</div>;
  }

  if (data) {
    const detailData = data.result;
    content = (
      <>
        <nav className="flex items-center h-20">
          <div
            className="flex items-center justify-center w-40 gap-1 cursor-pointer"
            onClick={() =>
              navigate('/news', {
                state: {
                  category: detailData.category,
                },
              })
            }
          >
            <IoIosArrowBack size={24} />
            <p className="font-medium text-[#333333] text-lg">
              {detailData.category === 'BOARD'
                ? '공지사항'
                : detailData.category === 'HEALTH'
                  ? '건강정보'
                  : detailData.category === 'LIFE'
                    ? '생활정보'
                    : '분류'}
            </p>
          </div>
        </nav>
        <div>
          <div className="bg-[#F2F2F2] px-80 pt-10 pb-28">
            <div
              // style={{ padding: '64px' }}
              className="py-8 px-12 border rounded-[18px] shadow-lg transition-all bg-white"
            >
              <Profile name={detailData.author} date={detailData.createdAt} />
              <div className="w-full">
                <p
                  style={{
                    height: '29px',
                    marginBottom: '16px',
                    fontSize: '24px',
                    color: '#000000',
                    fontWeight: 'bold',
                  }}
                >
                  {detailData.title}
                </p>
                <p
                  style={{
                    marginBottom: '32px',
                    fontSize: '18px',
                    // width: '752px',
                    lineHeight: '28.8px',
                    color: '#666666',
                  }}
                >
                  {detailData.content}
                </p>
                {/* {detailData.imageList.map((image) => {
                  <img src={image} alt=""/>
                })} */}
                {detailData.imageList.map((image, index) => (
                  <img key={index} src={image.imageUrl} alt="post" />
                ))}
                <p style={{ textAlign: 'right', color: '#888888' }}>
                  <img
                    src="/assets/News/view.svg"
                    alt="view"
                    style={{
                      display: 'inline-block',
                      verticalAlign: 'middle',
                      marginRight: '8px',
                    }}
                  />
                  <span style={{ fontSize: '18px', verticalAlign: 'middle' }}>
                    {detailData.views.toLocaleString()}명이 봤어요
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div
            style={{
              width: '100%',
              height: '666px',
              backgroundColor: '#FFFFFF',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <p
                style={{
                  textAlign: 'left',
                  width: '1141px',
                  fontSize: '24px',
                  color: '#1A1A1A',
                  lineHeight: '28.64px',
                  backgroundColor: 'white',
                  fontWeight: 'bold',
                  margin: '56px auto 0px',
                }}
              >
                많이 보는 뉴스
              </p>
              <div
                className="swipecontainer"
                style={{
                  width: '1141px',
                  height: '414px',
                  backgroundColor: 'transparent',
                  margin: '24px auto ',
                }}
              >
                <Swiper
                  navigation={true}
                  modules={[Navigation]}
                  spaceBetween={2}
                  slidesPerView={4}
                  slidesPerGroup={4}
                  speed={1000}
                >
                  {NewsData?.result?.newsList?.map((news) => (
                    <SwiperSlide key={news?.id}>
                      <div
                        className="relative w-[274px] h-[404px] rounded-[18px] shadow-lg cursor-pointer hover:scale-95 hover:ease-in-out transition-all"
                        onClick={() => navigate(`/news/${news?.id}`)}
                      >
                        <img
                          src={news.imageUrl}
                          alt="lesson-img"
                          className="object-cover w-60 h-60 rounded-t-[18px]"
                        />
                        <section className="w-full p-4">
                          <p
                            style={{
                              height: '17px',
                              fontSize: '14px',
                              fontWeight: '500',
                              color: '#EC9D26',
                              lineHeight: '16.71px',
                              marginBottom: '8px',
                            }}
                          >
                            {news.category === 'BOARD'
                              ? '공지사항'
                              : 'HEALTH'
                                ? '건강정보'
                                : 'LIFE'
                                  ? '생활정보'
                                  : '취업정보'}
                          </p>
                          <p className="mb-2">{news.title}</p>
                          <section
                            className="author"
                            style={{
                              width: 'auto',
                              height: '24px',
                              fontSize: '12px',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <img
                              src={`/assets/Teacher/teacher1.svg`}
                              alt="authorImg"
                              style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                marginRight: '8px',
                              }}
                            />
                            <p
                              style={{
                                marginRight: '8px',
                                color: '#808080',
                                lineHeight: '14.32px',
                              }}
                            >
                              {news.author}
                            </p>
                            <p
                              style={{
                                color: '#B3B3B3',
                                lineHeight: '14.32px',
                              }}
                            >
                              {fromNowHour(news.createdAt)}
                            </p>
                          </section>
                        </section>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return <div>{content}</div>;
};

export default DetailPage;
