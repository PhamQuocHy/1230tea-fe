import React, { useEffect } from "react";
import { GiJusticeStar } from "react-icons/gi";
import BestSeller from "../../../components/action/BestSeller";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { RootState } from "../../../redux/store";
import { formatNumberToMoney } from "../../../utils/numbers";
import ItemModal from "../Dialog/ItemModal";
import { productZodiacIndexApi } from "../OrderApi";
import { addToCart } from "../OrderState";

import Banner from "../../../components/action/Banner";
import "./style.scss";

type Props = {};

const OrderViewManager = (props: Props) => {
  const dispatch = useAppDispatch();

  const [product, setProduct] = React.useState<any>([]);
  const [allProduct, setAllProduct] = React.useState<any>([]);
  const [topping, setTopping] = React.useState<any>([]);
  const [selectedCategory, setSelectedCategory] = React.useState(-1);
  const [selectedProductKey, setSelectedProductKey] = React.useState<any>();
  const [selectedProduct, setSelectedProduct] = React.useState<any>({});
  const [isOpen, setIsOpen] = React.useState(false);
  const [cateid, setCateId] = React.useState(1);

  const token = useAppSelector(
    (state: RootState) => state.rootReducer.auth.token
  );

  const user = useAppSelector((state) => state.rootReducer.auth.user);

  useEffect(() => {
    (async () => {
      const dispatchResponse = await dispatch(
        productZodiacIndexApi({
          currentBranch: 7,
          zodiac_id: -1,
        })
      );
      const response = await dispatchResponse?.payload;
      const productCategory = response?.data?.products;
      const mainProductCategory = productCategory?.filter(
        (item: any) => item.id !== 3
      );
      const toppingProductCategory = productCategory?.filter(
        (item: any) => item.id === 3
      );

      const tempAllProduct = [].concat(
        ...mainProductCategory.map((item: any, index: number) => {
          return item.product;
        })
      );

      setProduct((prev: any) => mainProductCategory);
      setTopping((prev: any) => toppingProductCategory[0].product);
      setAllProduct((prev: any) => tempAllProduct);
    })();
  }, [dispatch]);

  const handleClose = () => {
    setIsOpen((prev: boolean) => false);
  };

  const confirmAddToCart = async (data: any) => {
    await dispatch(addToCart(data));
  };

  const mouseHoverEfect = (e: any, tsp: boolean) => {
    const textContent = e.target.querySelectorAll(".js-text-content");
    if (tsp === false) {
      e.target.style.backgroundColor = `${user.get_customer?.zodiac.color_web_first} `;
      e.target.style.color = user.get_customer?.zodiac.color_web_second;
      if (textContent) {
        for (let i = 0; i < textContent.length; i++) {
          textContent[i].style.color =
            user.get_customer?.zodiac.color_web_second;
        }
      }
    } else {
      e.target.style.backgroundColor = `${user.get_customer?.zodiac.color_web_second} `;
      e.target.style.color = user.get_customer?.zodiac.color_web_first;
      if (textContent) {
        for (let i = 0; i < textContent.length; i++) {
          textContent[i].style.color =
            user.get_customer?.zodiac.color_web_first;
        }
      }
    }
  };

  const mouseOutEfect = (e: any, tsp: boolean) => {
    const textContent = e.target.querySelectorAll(".js-text-content");
    if (tsp == false) {
      e.target.style.backgroundColor = `${user.get_customer?.zodiac.color_web_second} `;
      e.target.style.color = user.get_customer?.zodiac.color_web_first;
      if (textContent) {
        for (let i = 0; i < textContent.length; i++) {
          textContent[i].style.color =
            user.get_customer?.zodiac.color_web_first;
        }
      }
    } else {
      e.target.style.backgroundColor = "transparent";
      e.target.style.color = user.get_customer?.zodiac.color_web_second;
      if (textContent) {
        for (let i = 0; i < textContent.length; i++) {
          textContent[i].style.color =
            user.get_customer?.zodiac.color_web_second;
          textContent[i].style.backgroundColor = "transparent";
        }
      }
    }
    // e.target.style.border = `2px solid ${user.get_customer?.zodiac.color_web_first} `;
    const line = e.target.querySelector(".line-cart");
    if (line) {
      line.style.border = `1px solid ${user.get_customer?.zodiac.color_web_first}`;
    }
  };

  return (
    <div className=" w-full flex flex-col max-w-full overflow-hidden h-full">
      {/* Banner  */}
      <div className="lg:hidden">
        <Banner />
      </div>

      {/* Best Seller */}
      <div className="py-2 h-full bg-BackgroundLight">
        <BestSeller />
      </div>
      {/* End Bestseller */}

      {/* List Product */}
      <div className="w-full py-8 content-bg">
        <div
          style={
            !user.get_customer?.zodiac.color_web_first
              ? { backgroundColor: "#022132" }
              : {
                  backgroundColor: `${user.get_customer?.zodiac.color_web_first}`,
                }
          }
          className="overLay__content lg:opacity-80 left-0 right-0 top-0 bottom-0 absolute"
        ></div>

        <div className="w-width-layout max-w-full relative z-[5] my-0 mx-auto">
          {/*  */}
          {/* <div className="h-[10%] hidden px-5 justify-center">
            <div className="flex flex-row flex-nowrap items-center gap-5 w-full h-full 2xl:w-3/4 scrollbar-hide overflow-x-auto">
              <button
                className={`${
                  selectedCategory === -1
                    ? "bg-TertiaryLight text-OnTertiaryLight border-TertiaryLight/40 border-solid shadow-lg"
                    : "bg-TertiaryContainerLight text-OnTertiaryContainerLight border-TertiaryContainerLight/40"
                } flex-none items-center justify-center md:h-[50%] md:w-[15%] h-[50%] w-[20%] rounded-full`}
                onClick={() => setSelectedCategory(-1)}
              >
                Tất cả
              </button>
              {product.map((item: any, index: number) => {
                return (
                  <button
                    className={`${
                      selectedCategory === index
                        ? "bg-TertiaryLight text-OnTertiaryLight border-TertiaryLight/40 border-solid shadow-lg"
                        : "bg-TertiaryContainerLight text-OnTertiaryContainerLight border-TertiaryContainerLight/40"
                    }  items-center justify-center md:h-[50%] md:w-[15%] h-[50%] w-[20%] flex-none rounded-full`}
                    key={item.id}
                    onClick={() => setSelectedCategory(index)}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div> */}
          {/*  */}

          {/* Title */}
          <div>
            <div className=" w-width-layout max-w-full mx-auto my-0 pb-3">
              <div className="text-center">
                <h1
                  style={
                    !user.get_customer?.zodiac.color_web_second
                      ? { color: "#FAA31B" }
                      : { color: user.get_customer?.zodiac.color_web_second }
                  }
                  className="font-bold text-[30px] my-2 uppercase"
                >
                  Thực đơn đồ uống
                </h1>
              </div>
              <div className="text-center flex items-center justify-center">
                <span className="lg:w-[200px] w-[30%] border border-solid border-[#fff]"></span>
                <GiJusticeStar
                  color="#fff"
                  className="mx-[6px]"
                  size={"1.2rem"}
                />
                <span className="lg:w-[200px] w-[30%] border border-solid border-[#fff]"></span>
              </div>
            </div>
          </div>
          {/* End title */}

          {/* Tabs */}
          <div className="flex items-center flex-wrap py-3 list-cate max-w-full w-width-layout">
            <div className="px-4 py-2 w-1/2 lg:w-1/5 md:w-1/4">
              {user.get_customer?.zodiac.color_web_second ? (
                <button
                  onClick={() => setSelectedCategory(-1)}
                  style={
                    selectedCategory === -1
                      ? {
                          backgroundColor:
                            user.get_customer?.zodiac.color_web_second,
                          border: `2px solid ${user.get_customer?.zodiac.color_web_first}`,
                          color: `${user.get_customer?.zodiac.color_web_first}`,
                        }
                      : {
                          backgroundColor: "transparent",
                          border: `2px solid ${user.get_customer?.zodiac.color_web_second}`,
                          color: `${user.get_customer?.zodiac.color_web_second}`,
                        }
                  }
                  className={
                    " uppercase rounded-md cursor-pointer hover:opacity-75 transition-all w-full duration-100 ease-linear font-bold  text-[18px] py-2 px-5 "
                  }
                >
                  Tất cả
                </button>
              ) : (
                <button
                  onClick={() => setSelectedCategory(-1)}
                  className={`${
                    selectedCategory === -1
                      ? "bg-background-yelow lg:hover:bg-transparent border-yelow"
                      : "bg-transparent lg:hover:bg-background-yelow border-yelow"
                  } " uppercase rounded-md cursor-pointer  transition-all 
                     duration-200 ease-linear text-white font-bold 
                     text-[18px] w-full py-2 px-5 border-2 border-solid "
                     `}
                >
                  Tất cả
                </button>
              )}
            </div>
            {product.map((item: any, index: number) => (
              <div className="lg:w-1/5 w-1/2 md:w-1/4">
                <div className="px-4 py-2" key={index}>
                  {user.get_customer?.zodiac.color_web_second ? (
                    <button
                      onClick={() => setSelectedCategory(index)}
                      style={
                        selectedCategory === index
                          ? {
                              backgroundColor:
                                user.get_customer?.zodiac.color_web_second,
                              border: `2px solid ${user.get_customer?.zodiac.color_web_first}`,
                              color: `${user.get_customer?.zodiac.color_web_first}`,
                            }
                          : {
                              backgroundColor: "transparent",
                              border: `2px solid ${user.get_customer?.zodiac.color_web_second}`,
                              color: `${user.get_customer?.zodiac.color_web_second}`,
                            }
                      }
                      className={
                        " uppercase rounded-md cursor-pointer hover:opacity-75 transition-all w-full duration-100 ease-linear font-bold  text-[18px] py-2 px-5 "
                      }
                    >
                      {item.name}
                    </button>
                  ) : (
                    <button
                      onClick={() => setSelectedCategory(index)}
                      className={`${
                        selectedCategory === index
                          ? "bg-background-yelow lg:hover:bg-transparent border-yelow"
                          : "bg-transparent lg:hover:bg-background-yelow border-yelow"
                      } " uppercase rounded-md cursor-pointer  transition-all 
                     duration-200 ease-linear text-white font-bold 
                     text-[18px] w-full py-2 px-5 border-2 border-solid "
                     `}
                    >
                      {item.name}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* End Tabs */}

          {/* Content */}
          <div className="flex-initial px-4 h-[85%] xl:h-[90%] py-5 flex flex-wrap justify-between">
            {selectedCategory === -1
              ? allProduct.map((item: any, index: number) => {
                  return (
                    <div
                      key={item.id}
                      className="w-1/2 lg:w-1/4 px-2 mx-[-4px] py-4"
                    >
                      <div
                        style={{ boxShadow: "#333 2px 4px 4px 1px" }}
                        className={`bg-white flex flex-col overflow-hidden rounded-xl `}
                        // onClick={() => {
                        //   setSelectedProduct((prev: any) => item);
                        //   setIsOpen((prev: boolean) => true);
                        //   setSelectedProductKey(
                        //     (prev: any) => item.id + "_" + Math.random()
                        //   );
                        // }}
                      >
                        <div
                          className="flex-initial lg:h-[300px] h-[150px] w-full  bg-cover bg-center bg-no-repeat"
                          style={{
                            backgroundImage: `url(${item.image_url})`,
                          }}
                        ></div>

                        <div className="text-left p-3 flex flex-col ">
                          <div className="name-product__box text-[16px] leading-[24px] h-[48px] uppercase text-left font-medium text-[#002D45]">
                            {item.name}
                          </div>
                          <div className="subname-product__box h-[20px] text-[14px] capitalize leading-[20px] my-2">
                            Matcha Bubbles Tea
                          </div>
                          <div className="font-bold text-left text-color-red text-[22px]">
                            {formatNumberToMoney(item.price)} VNĐ
                          </div>
                          <div className="pt-3 pb-2">
                            {user.get_customer?.zodiac.color_web_second ? (
                              <button
                                onClick={() => {
                                  setSelectedProduct((prev: any) => item);
                                  setIsOpen((prev: boolean) => true);
                                  setSelectedProductKey(
                                    (prev: any) => item.id + "_" + Math.random()
                                  );
                                }}
                                style={{
                                  backgroundColor:
                                    user.get_customer?.zodiac.color_web_first,
                                  color:
                                    user.get_customer?.zodiac.color_web_second,
                                  border: `2px solid ${user.get_customer?.zodiac.color_web_first}`,
                                }}
                                className="font-semibold hover:opacity-75 transition-all duration-200 ease-linear  py-2 cursor-pointer text-[16px] rounded-md lg:px-7 w-full"
                              >
                                Thêm món
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  setSelectedProduct((prev: any) => item);
                                  setIsOpen((prev: boolean) => true);
                                  setSelectedProductKey(
                                    (prev: any) => item.id + "_" + Math.random()
                                  );
                                }}
                                className="font-semibold hover:bg-[#FAA31B] hover:border-[#FAA31B] transition-all duration-200 ease-linear border-2 border-solid border-[#002D45] py-2 cursor-pointer text-[16px] rounded-md lg:px-7 w-full bg-background-blue-dark text-white"
                              >
                                Thêm món
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : product[selectedCategory]?.product.map(
                  (item: any, index: number) => {
                    return (
                      <div
                        key={item.id}
                        style={{ boxShadow: "#333 2px 4px 4px 1px" }}
                        className={`bg-white flex flex-col overflow-hidden rounded-xl`}
                        // onClick={() => {
                        //   setSelectedProduct((prev: any) => item);
                        //   setIsOpen((prev: boolean) => true);
                        //   setSelectedProductKey(
                        //     (prev: any) => item.id + "_" + Math.random()
                        //   );
                        // }}
                      >
                        <div
                          className="flex-initial lg:h-[300px] h-[230px]  w-full  bg-cover bg-center bg-no-repeat"
                          style={{
                            backgroundImage: `url(${item.image_url})`,
                          }}
                        ></div>

                        <div className="text-left p-3 flex flex-col ">
                          <div className="name-product__box text-[16px] leading-[24px] h-[48px] uppercase text-left font-medium text-[#002D45]">
                            {item.name}
                          </div>
                          <div className="subname-product__box h-[20px] text-[14px] capitalize leading-[20px] my-2">
                            Matcha Bubbles Tea
                          </div>
                          <div className="font-bold text-left text-color-red text-[22px]">
                            {formatNumberToMoney(item.price)} VNĐ
                          </div>
                          <div className="pt-3 pb-2">
                            <button
                              onClick={() => {
                                setSelectedProduct((prev: any) => item);
                                setIsOpen((prev: boolean) => true);
                                setSelectedProductKey(
                                  (prev: any) => item.id + "_" + Math.random()
                                );
                              }}
                              className="font-semibold hover:bg-[#FAA31B] hover:border-[#FAA31B] transition-all duration-200 ease-linear border-2 border-solid border-[#002D45] py-2 cursor-pointer text-[16px] rounded-md px-7 bg-background-blue-dark text-white"
                            >
                              Thêm món
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
          </div>
          {/* End Content */}
        </div>
      </div>
      {/* End List Product */}

      {Object.keys(selectedProduct).length > 0 && (
        <ItemModal
          key={selectedProductKey}
          isOpen={isOpen}
          isCartItem={false}
          handleConfirm={confirmAddToCart}
          handleClose={handleClose}
          item={selectedProduct}
          topping={topping}
          selectedProductKey={selectedProductKey}
        />
      )}
    </div>
  );
};

export default OrderViewManager;
