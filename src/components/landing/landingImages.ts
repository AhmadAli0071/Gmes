import lastMinuteImage from '../../assets/images/use-cases/last-minute.jpg';
import christmasImage from '../../assets/images/template_christmas_wonder_1791359394567.jpg';
import anniversaryImage from '../../assets/images/guides/anniversary.jpg';
import thanksgivingImage from '../../assets/images/blog/thanksgiving-thank-you.jpg';
import virtualGiftImage from '../../assets/images/blog/virtual-gift.jpg';
import digitalChristmasImage from '../../assets/images/blog/digital-christmas-gift.jpg';
import holidayShippingImage from '../../assets/images/blog/holiday-shipping.jpg';
import budgetGiftImage from '../../assets/images/blog/budget-gift.jpg';
import longDistanceBirthdayImage from '../../assets/images/blog/long-distance-birthday.jpg';
import valentinesLongDistanceImage from '../../assets/images/blog/valentines-long-distance.jpg';
import voiceMessageImage from '../../assets/images/blog/voice-message-gift.jpg';
import parentsAbroadImage from '../../assets/images/blog/parents-abroad.jpg';
import newYearMessagesImage from '../../assets/images/blog/new-year-messages.jpg';
import photoGiftImage from '../../assets/images/blog/photo-gift-digital.jpg';
import giftComparisonImage from '../../assets/images/blog/gift-comparison.jpg';
import ecoGiftImage from '../../assets/images/blog/eco-friendly-gift.jpg';
import type { LandingImageKey } from '../../data/landingPages';

export const LANDING_IMAGES: Record<LandingImageKey, string> = {
  'long-distance-couple': longDistanceBirthdayImage,
  'christmas-gift': christmasImage,
  'instant-gift': lastMinuteImage,
  'valentines-gift': valentinesLongDistanceImage,
  'photo-memory': anniversaryImage,
  'thanksgiving-gift': thanksgivingImage,
  'virtual-gift': virtualGiftImage,
  'digital-christmas-gift': digitalChristmasImage,
  'holiday-shipping': holidayShippingImage,
  'budget-gift': budgetGiftImage,
  'voice-message-gift': voiceMessageImage,
  'parents-abroad': parentsAbroadImage,
  'new-year-messages': newYearMessagesImage,
  'photo-gift': photoGiftImage,
  'gift-comparison': giftComparisonImage,
  'eco-gift': ecoGiftImage,
};
