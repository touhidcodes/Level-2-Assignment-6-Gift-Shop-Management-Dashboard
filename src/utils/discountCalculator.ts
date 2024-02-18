import { TCoupon } from "../interface/coupon.interface";

type TVerifiedCouponData = {
  data: TCoupon;
};

export const discountCalculator = (
  totalPrice: number,
  verifiedCouponData: TVerifiedCouponData
) => {
  if (verifiedCouponData) {
    const discountPrice =
      (totalPrice * verifiedCouponData?.data?.discount) / 100;
    return Number(discountPrice.toFixed(2));
  } else {
    return 0;
  }
};
