export interface SoupNutrition {
  caloriesPer100ml: number;
  proteinPer100ml: number;
  collagenPer100ml: number; // in grams (Type II / gelatin peptides)
  healthyFatsPer100ml: number;
  primaryBioactive: string;
  healthHighlight: string;
}

export interface SoupService {
  id: string;
  name: string;
  punjabiName: string;
  category: 'daily' | 'healing' | 'bulk';
  tagline: string;
  description: string;
  included: string[];
  whoItIsFor: string;
  benefits: string[];
  simmerTime: string;
  sizes: { label: string; volume: string; price: string }[];
  keyIngredients: string[];
  flavorProfile: string;
  nutrition: SoupNutrition;
}

export const SOUP_SERVICES: SoupService[] = [
  {
    id: 'golden-bone-broth',
    name: '12-Hour Golden Collagen Bone Broth',
    punjabiName: 'ਅਸਲ ਦੇਸੀ ਚਿਕਨ ਹੱਡੀ ਸ਼ੋਰਬਾ',
    category: 'daily',
    tagline: 'Pure slow-extracted marrow & cartilage broth with glistening natural schmaltz',
    description: 'Our signature slow-simmered broth, gently extracted over 12 continuous hours from free-range chicken marrow bones, organic ginger roots, whole crushed black pepper, and fresh aromatics. No cornstarch, no bouillon cubes, no artificial powders—only pure golden liquid collagen.',
    included: [
      '350ml or 750ml piping hot golden chicken broth',
      'Fresh whole-root ginger shreds & roasted peppercorn garnish',
      'Hygienic clay-sealed thermal bottle or earthen pot packaging',
      'Accompanied by freshly toasted herb croutons & lemon wedge'
    ],
    whoItIsFor: 'Fitness athletes seeking bio-available joint collagen, working professionals needing sustained energy, and soup connoisseurs who appreciate pure slow-cooked depth.',
    benefits: [
      'Over 18g natural bio-available protein per serving',
      'Rich in Type II collagen, glucosamine, and chondroitin for joint recovery',
      'Gently coats and soothes gut lining, easing digestion',
      'Deep, comforting warmth during Ludhiana winter breezes'
    ],
    simmerTime: '12 Hours Low Flame',
    sizes: [
      { label: 'Single Bowl', volume: '350 ml', price: '₹140' },
      { label: 'Artisanal Ceramic Jar', volume: '750 ml', price: '₹270' },
      { label: 'Immunity Flask', volume: '1000 ml', price: '₹350' }
    ],
    keyIngredients: ['Free-range chicken marrow bones', 'Fresh ginger root', 'Whole tellicherry black pepper', 'Organic turmeric', 'Wild celery stem'],
    flavorProfile: 'Silky, full-bodied, delicately spiced with a gentle peppery throat warmth',
    nutrition: {
      caloriesPer100ml: 46,
      proteinPer100ml: 5.4,
      collagenPer100ml: 3.8,
      healthyFatsPer100ml: 1.6,
      primaryBioactive: 'Type II Collagen, Glycine & Proline',
      healthHighlight: '12-hour low flame extraction creates natural gelatin for joint cartilage repair & gut lining restoration'
    }
  },
  {
    id: 'desi-black-pepper-shorba',
    name: 'Desi Kali Mirch & Herb Immunity Shorba',
    punjabiName: 'ਦੇਸੀ ਕਾਲੀ ਮਿਰਚ ਤੇ ਲਸਣ ਸ਼ੋਰਬਾ',
    category: 'healing',
    tagline: 'Traditional Punjabi herbal chicken extract with crushed black pepper & roasted garlic',
    description: 'A fiery, comforting immunity elixer perfected over 15 years in Ludhiana. We roast whole Malabar black peppercorns in pure chicken fat before simmering them with garlic cloves, clove buds, and shredded chicken. Designed to clear congested sinuses and provide instant respiratory relief.',
    included: [
      'Piping hot concentrated immunity shorba',
      'Generous crushed roasted black pepper infusion',
      'Crispy fried garlic slivers & fresh coriander garnish',
      'Sealed in insulated temperature-locking container'
    ],
    whoItIsFor: 'Anyone battling seasonal flu, chest congestion, cold weather fatigue, or seeking a natural Ayurvedic-inspired immunity boost.',
    benefits: [
      'Rapid clearing of nasal passages and respiratory airways',
      'Garlic-allicin antimicrobial defense synergy',
      'Stimulates core metabolism and thermogenesis',
      'Promotes deep restful sleep after an evening bowl'
    ],
    simmerTime: '8 Hours Extraction',
    sizes: [
      { label: 'Single Bowl', volume: '350 ml', price: '₹150' },
      { label: 'Artisanal Ceramic Jar', volume: '750 ml', price: '₹290' },
      { label: 'Immunity Flask', volume: '1000 ml', price: '₹370' }
    ],
    keyIngredients: ['Desi chicken cuts', 'Crushed roasted black pepper', 'Garlic cloves', 'Green cardamom', 'Cinnamon bark', 'Coriander leaves'],
    flavorProfile: 'Bold, robust, invigorating with a lingering warming black pepper finish',
    nutrition: {
      caloriesPer100ml: 44,
      proteinPer100ml: 4.8,
      collagenPer100ml: 2.9,
      healthyFatsPer100ml: 1.8,
      primaryBioactive: 'Piperine, Allicin & Natural Electrolytes',
      healthHighlight: 'Roasted black pepper & garlic boost circulation, soothe irritated throat tissue & clear sinuses'
    }
  },
  {
    id: 'royal-pulled-chicken-pot',
    name: 'Royal Pulled Chicken & Corn Marrow Soup',
    punjabiName: 'ਸ਼ਾਹੀ ਪੁਲਡ ਚਿਕਨ ਮੈਰੋ ਸੂਪ',
    category: 'daily',
    tagline: 'Hearty meal-in-a-bowl featuring shredded tender chicken breast and rich golden broth',
    description: 'For those who want substance along with therapeutic broth. Hand-shredded tender chicken breast chunks swim in a rich, amber bone-broth reduction lightly thickened with sweet golden sweetcorn, simmered carrots, and egg flower ribbons.',
    included: [
      'Heaping portion of tender hand-pulled chicken breast in every bowl',
      'Velvety broth with sweetcorn kernels & fine-cut vegetable mirepoix',
      'Chili-vinegar & ginger-soy dipping seasoning on the side',
      'Fresh garlic breadsticks or crispy soup crackers'
    ],
    whoItIsFor: 'Dinner replacement, families with children, gym-goers requiring dense protein, and casual food lovers craving a hearty comfort meal.',
    benefits: [
      '26g lean muscle-building protein per 400ml serving',
      'Complex carbohydrates for sustained blood-sugar stability',
      'Zero artificial thickeners or synthetic preservatives',
      'Satiating and wholesome comfort without post-meal lethargy'
    ],
    simmerTime: '10 Hours Broth + Slow Poached Meat',
    sizes: [
      { label: 'Hearty Bowl', volume: '400 ml', price: '₹180' },
      { label: 'Sharing Clay Pot', volume: '800 ml', price: '₹340' }
    ],
    keyIngredients: ['Tender chicken breast shreds', 'Simmered bone broth', 'Sweet golden corn', 'Egg ribbons', 'Spring onion greens', 'White pepper'],
    flavorProfile: 'Savory, comforting, subtly sweet with tender chicken texture in every spoonful',
    nutrition: {
      caloriesPer100ml: 65,
      proteinPer100ml: 6.8,
      collagenPer100ml: 2.4,
      healthyFatsPer100ml: 1.9,
      primaryBioactive: 'Lean Poultry Peptides & B-Complex Vitamins',
      healthHighlight: 'Dense meal-grade protein supports muscle tissue synthesis without heavy grease'
    }
  },
  {
    id: 'patient-recovery-packs',
    name: 'Patient Convalescence & Hospital Care Broth',
    punjabiName: 'ਮਰੀਜ਼ ਸਿਹਤਯਾਬੀ ਤੇ ਕਮਜ਼ੋਰੀ ਰਿਕਵਰੀ ਪੈਕ',
    category: 'healing',
    tagline: 'Special low-sodium, ultra-clarified restorative broth for patients near Kdeep Hospital & CMC',
    description: 'Developed in consultation with local care-givers and families visiting nearby Kdeep Hospital and Ludhiana clinics. Double-strained to remove all heavy sediment, skimmed of excess grease while retaining vital collagen, peptides, and electrolytes. Gentle on sensitive stomachs.',
    included: [
      'Ultra-clarified, non-greasy chicken consommé-grade broth',
      'Customized sodium options: Low-sodium, No-salt, or Light Himalayan pink salt',
      'Zero heavy spices or chilies—pure ginger & mild bay leaf aroma',
      'Sterilized, hospital-friendly double-walled vacuum thermal flask'
    ],
    whoItIsFor: 'Post-operative patients, elderly individuals recovering from illness, people with delicate digestive systems, and pregnant/postpartum mothers.',
    benefits: [
      'Effortless digestion requiring minimal metabolic breakdown energy',
      'Hydrates rapidly with natural potassium, magnesium, and sodium balance',
      'Accelerates tissue healing via concentrated proline and glycine amino acids',
      'Nourishing when solid food cannot yet be tolerated'
    ],
    simmerTime: '14 Hours Double-Clarified Slow Extraction',
    sizes: [
      { label: 'Care Flask', volume: '500 ml', price: '₹190' },
      { label: 'Daily Healing Pack', volume: '1000 ml', price: '₹360' },
      { label: '3-Day Convalescence Subscription', volume: '3 x 1000 ml', price: '₹999' }
    ],
    keyIngredients: ['Clean chicken carcass & cartilage', 'Peeled mild ginger', 'Coriander root', 'Pink rock salt', 'Light bay leaf'],
    flavorProfile: 'Exceptionally smooth, gentle, clean, with delicate natural savory warmth',
    nutrition: {
      caloriesPer100ml: 38,
      proteinPer100ml: 5.0,
      collagenPer100ml: 3.5,
      healthyFatsPer100ml: 0.6,
      primaryBioactive: 'Ultra-Clarified Peptides & Cellular Electrolytes',
      healthHighlight: 'Skimmed of heavy fats for seamless gastrointestinal absorption; supplies critical amino acids for post-op healing'
    }
  },
  {
    id: 'family-takeaway-kettle',
    name: 'Heritage Family Care Kettle (1.5 Liters)',
    punjabiName: 'ਪਰਿਵਾਰਕ ਕੇਤਲੀ ਟੇਕਅਵੇ',
    category: 'bulk',
    tagline: 'Large thermal takeaway kettle designed to nourish the whole household over dinner',
    description: 'Our most popular weekend and winter evening package. We fill an insulated family kettle with 1.5 liters of piping hot soup of your choice, accompanied by a generous tub of hand-shredded chicken, fresh herbs, toasted seeds, and crispy accompaniments.',
    included: [
      '1.5 Liters of piping hot slow-simmered chicken soup (serves 4-5 adults)',
      'Side container with 250g tender pulled chicken breast',
      '4 portions of toasted herb croutons & fresh lemon halves',
      'Insulated returnable/reusable thermal container'
    ],
    whoItIsFor: 'Ludhiana families gathering for evening meals, Sunday winter lunches, and care packages sent to relatives and parents in Model Town, Civil Lines, and Samrala Chowk.',
    benefits: [
      'Cost-effective family dining with zero cooking effort',
      'Keeps steaming hot for over 3 hours in the thermal vessel',
      'Customizable bowls for kids, adults, and elderly at home'
    ],
    simmerTime: 'Daily Fresh Batch Preparation',
    sizes: [
      { label: 'Family Kettle', volume: '1500 ml (Serves 4-5)', price: '₹550' },
      { label: 'Grand Family Pot', volume: '2500 ml (Serves 7-8)', price: '₹890' }
    ],
    keyIngredients: ['Full chicken slow extraction', 'Custom choice of shorba / herbal / sweetcorn broth', 'Artisanal accompaniments'],
    flavorProfile: 'Rich, celebratory, wholesome family comfort',
    nutrition: {
      caloriesPer100ml: 50,
      proteinPer100ml: 5.2,
      collagenPer100ml: 3.2,
      healthyFatsPer100ml: 1.7,
      primaryBioactive: 'Whole-Extraction Mineral & Collagen Spectrum',
      healthHighlight: 'Feeds 4-5 family members with whole-food bone nourishment; provides ~18g natural protein per individual bowl'
    }
  },
  {
    id: 'event-catering-kettles',
    name: 'Winter Wedding & Gathering Live Soup Kettles',
    punjabiName: 'ਵਿਆਹ ਸਮਾਗਮ ਲਾਈਵ ਸ਼ੋਰਬਾ ਕੇਤਲੀ ਸਰਵਿਸ',
    category: 'bulk',
    tagline: 'Live simmering brass and copper soup kettles for private gatherings, Lohri parties & weddings in Ludhiana',
    description: 'Elevate your winter event with Ludhiana’s most talked-about live chicken shorba counter. We bring authentic slow-simmering copper soup samovars with live chef pouring, custom spice stations, and artisanal pottery kulhad cups.',
    included: [
      'Live decorative hammered copper/brass soup dispenser setup',
      'Dedicated soup sommelier / service attendant',
      'Choice of 2 signature broths (Golden Collagen & Desi Black Pepper)',
      'Traditional clay kulhad cups, pulled chicken toppings, and garnishes'
    ],
    whoItIsFor: 'Winter weddings, Anand Karaj receptions, Lohri celebrations, corporate dinners, and housewarming gatherings in Ludhiana.',
    benefits: [
      'Spectacular guest engagement and warm hospitality',
      'Zero synthetic buffet powders—genuine gourmet culinary standard',
      'Flexible serving capacity from 50 to 500+ attendees'
    ],
    simmerTime: 'Crafted on location and pre-extracted for 12 hours',
    sizes: [
      { label: 'Small Gathering Kettle', volume: '10 Liters (30-35 cups)', price: '₹3,500' },
      { label: 'Wedding Royal Counter', volume: '25 Liters (80-90 cups)', price: '₹7,900' },
      { label: 'Grand Banquet Live Station', volume: '50+ Liters', price: 'Custom Quote' }
    ],
    keyIngredients: ['Full batch slow-cooked chicken stock', 'Live tempering stations', 'Whole aromatic spices'],
    flavorProfile: 'Aromatic, royal, hot-spiced winter centerpiece',
    nutrition: {
      caloriesPer100ml: 48,
      proteinPer100ml: 5.0,
      collagenPer100ml: 3.4,
      healthyFatsPer100ml: 1.7,
      primaryBioactive: 'Simmered Bone Marrow & Warming Herbal Compounds',
      healthHighlight: 'Live-simmered in copper samovars to keep bio-active gelatin liquid and warm for all celebration guests'
    }
  }
];

export const WORKING_HOURS = [
  { day: 'Thursday', hours: '10:30 am – 8:00 pm', openHour: 10.5, closeHour: 20 },
  { day: 'Friday', hours: '10:30 am – 8:00 pm', openHour: 10.5, closeHour: 20 },
  { day: 'Saturday', hours: '10:00 am – 8:00 pm', openHour: 10, closeHour: 20 },
  { day: 'Sunday', hours: '10:30 am – 8:00 pm', openHour: 10.5, closeHour: 20 },
  { day: 'Monday', hours: '10:00 am – 8:00 pm', openHour: 10, closeHour: 20 },
  { day: 'Tuesday', hours: '10:30 am – 8:00 pm', openHour: 10.5, closeHour: 20 },
  { day: 'Wednesday', hours: '10:30 am – 8:00 pm', openHour: 10.5, closeHour: 20 }
];

export const BUSINESS_INFO = {
  name: "Harry's chicken",
  legalName: "Harry's Chicken & Slow-Simmered Broth House",
  owner: "Harpreet 'Harry' Singh",
  phone: "086994 36000",
  formattedPhone: "+91 86994 36000",
  email: "orders@harryschicken.in",
  address: "Samrala Chowk, LIG 156, SEC 22, near Green Land School Gate, Ludhiana, Punjab 141008",
  shortAddress: "Samrala Chowk, SEC 22, Ludhiana",
  landmark: "Near Green Land School Gate & Kdeep Hospital",
  googleMapsQuery: "Harry's chicken, Samrala Chowk, LIG 156, SEC 22, near Green Land School Gate, Ludhiana, Punjab 141008",
  whatsappNumber: "918699436000"
};

export const TESTIMONIALS = [
  {
    id: '1',
    name: 'Dr. Ramanpreet Kaur',
    role: 'Physical Rehabilitation Consultant',
    location: 'Near Kdeep Hospital, Ludhiana',
    quote: 'Whenever my patients are recovering from joint surgery or seasonal chest infections, I advise their families to get Harry’s bone broth. The 12-hour extraction produces genuine liquid collagen without greasy commercial thickeners. It has become our go-to therapeutic recommendation.',
    verified: 'Verified Regular Customer',
    rating: 5,
    date: 'February 2026'
  },
  {
    id: '2',
    name: 'Jasmeet Singh Bindra',
    role: 'Strength Coach & Athlete',
    location: 'Model Town, Ludhiana',
    quote: 'Finding real, clean bone broth in Ludhiana used to be impossible until Harry opened at Samrala Chowk. The chicken fat droplets on top are real schmaltz, and you can feel the clean protein warmth right down to your joints. I drink a 750ml jar three evenings every week.',
    verified: 'Daily Fitness Order',
    rating: 5,
    date: 'January 2026'
  },
  {
    id: '3',
    name: 'Ravinder Sharma',
    role: 'Resident & School Teacher',
    location: 'SEC 22, Near Green Land School',
    quote: 'We live right across the street. The aroma of slow-simmering chicken, black pepper, and ginger fills the evening air. On winter nights, nothing warms our children and elderly parents like their Royal Pulled Chicken Pot. Reliable, clean, and always steaming hot.',
    verified: 'Local Resident',
    rating: 5,
    date: 'November 2025'
  },
  {
    id: '4',
    name: 'Simran Gulati',
    role: 'Wedding & Social Event Planner',
    location: 'Ferozepur Road, Ludhiana',
    quote: 'We hired Harry’s live brass soup kettle for a 200-guest winter pre-wedding reception near Samrala Chowk. The guests abandoned the mocktail counter to stand around the steaming shorba station! The aroma of real chicken shorba poured in clay cups was the highlight of the night.',
    verified: 'Event Catering Client',
    rating: 5,
    date: 'December 2025'
  }
];

export const FAQS = [
  {
    question: 'Where is Harry’s chicken located in Ludhiana?',
    answer: 'We are conveniently located at Samrala Chowk, LIG 156, SEC 22, right near the Green Land School Gate in Ludhiana, Punjab 141008. We are just 2 minutes from Kdeep Hospital, making it very quick for patient care takeaways.'
  },
  {
    question: 'Do you deliver chicken soup across Ludhiana?',
    answer: 'Yes! We deliver hot, insulated jars and kettles throughout Ludhiana, including Samrala Chowk, Sector 22, Model Town, Civil Lines, Chandigarh Road, and Cheema Chowk. You can call 086994 36000 or message via WhatsApp to place an instant order.'
  },
  {
    question: 'How is Harry’s chicken soup different from restaurant soups?',
    answer: 'Commercial restaurants use cornstarch thickeners, MSG cubes, and pre-made stock powders that boil in 15 minutes. At Harry’s, our broths simmer gently for 10 to 14 hours over low flame. All body and viscosity comes from natural bone collagen, marrow minerals, and pure chicken schmaltz.'
  },
  {
    question: 'Can I order custom low-salt or spice-free soup for a hospital patient?',
    answer: 'Absolutely. We prepare special patient convalescence packs with low sodium or zero added salt, mild peeled ginger, and no harsh chili. Please mention patient requirements when calling 086994 36000.'
  },
  {
    question: 'Do you offer bulk catering for winter events, parties, and weddings?',
    answer: 'Yes, we provide live simmering copper and brass soup kettles with service staff, clay cups, and garnish counters for gatherings ranging from 20 to 500 guests in and around Ludhiana.'
  }
];
