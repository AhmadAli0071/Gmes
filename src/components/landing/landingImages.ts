import longDistanceImage from '../../assets/images/use-cases/long-distance.jpg';
import lastMinuteImage from '../../assets/images/use-cases/last-minute.jpg';
import christmasImage from '../../assets/images/template_christmas_wonder_1791359394567.jpg';
import valentinesImage from '../../assets/images/guides/valentines.jpg';
import anniversaryImage from '../../assets/images/guides/anniversary.jpg';
import thanksgivingImage from '../../assets/images/blog/thanksgiving-thank-you.jpg';
import virtualGiftImage from '../../assets/images/blog/virtual-gift.jpg';
import digitalChristmasImage from '../../assets/images/blog/digital-christmas-gift.jpg';
import holidayShippingImage from '../../assets/images/blog/holiday-shipping.jpg';
import budgetGiftImage from '../../assets/images/blog/budget-gift.jpg';
import type { LandingImageKey } from '../../data/landingPages';

export const LANDING_IMAGES: Record<LandingImageKey, string> = {
  'long-distance-couple': longDistanceImage,
  'christmas-gift': christmasImage,
  'instant-gift': lastMinuteImage,
  'valentines-gift': valentinesImage,
  'photo-memory': anniversaryImage,
  'thanksgiving-gift': thanksgivingImage,
  'virtual-gift': virtualGiftImage,
  'digital-christmas-gift': digitalChristmasImage,
  'holiday-shipping': holidayShippingImage,
  'budget-gift': budgetGiftImage,
};
