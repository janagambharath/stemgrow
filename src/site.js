const root = document.querySelector("#root");
const b = (en, te) => ({ en, te });
let locale = "en";
let filter = "all";
let selectedProduct = null;
let prefillProduct = "";
let formState = "idle";

const pick = (value) => typeof value === "string" ? value : value[locale];
const esc = (value) => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[character]));

const ui = {
  navHome: b("Home", "హోమ్"), navAbout: b("About Us", "మా గురించి"), navSolutions: b("Solutions", "పరిష్కారాలు"), navProducts: b("Products", "ఉత్పత్తులు"), navApproach: b("Our Approach", "మా విధానం"), navTestimonials: b("Testimonials", "రైతుల అభిప్రాయాలు"), navContact: b("Contact", "సంప్రదించండి"),
  contact: b("Contact Us", "సంప్రదించండి"), heroLabel: b("STEMGROW AGRI SOLUTIONS", "స్టెమ్‌గ్రో అగ్రి సొల్యూషన్స్"), heroLead: b("Growing Better.", "మెరుగైన పెరుగుదల."), heroTail: b("Farming Smarter.", "తెలివైన వ్యవసాయం."),
  heroCopy: b("STEMGROW AGRI SOLUTIONS PRIVATE LIMITED provides practical agricultural solutions across crop nutrition, plant growth support and biological crop protection.", "స్టెమ్‌గ్రో అగ్రి సొల్యూషన్స్ ప్రైవేట్ లిమిటెడ్ పంట పోషణ, మొక్కల పెరుగుదల మరియు జీవ ఆధారిత పంట రక్షణకు ఆచరణాత్మక వ్యవసాయ పరిష్కారాలను అందిస్తుంది."),
  explore: b("Explore Products", "ఉత్పత్తులు చూడండి"), talk: b("Talk to Us", "మాతో మాట్లాడండి"), viewSolutions: b("View Our Solutions", "మా పరిష్కారాలు చూడండి"), productCount: b("Focused Product Solutions", "ఎంపిక చేసిన ఉత్పత్తి పరిష్కారాలు"), nutrition: b("Crop Nutrition", "పంట పోషణ"), growth: b("Plant Growth", "మొక్కల పెరుగుదల"), biological: b("Biological Crop Protection", "జీవ ఆధారిత పంట రక్షణ"),
  aboutEyebrow: b("ABOUT STEMGROW", "స్టెమ్‌గ్రో గురించి"), aboutTitle: b("Practical Agricultural Solutions for Modern Farming", "ఆధునిక వ్యవసాయానికి ఆచరణాత్మక పరిష్కారాలు"),
  about1: b("STEMGROW AGRI SOLUTIONS PRIVATE LIMITED is an agriculture-focused company committed to providing innovative crop nutrition, plant growth and biological crop protection solutions to farmers.", "స్టెమ్‌గ్రో అగ్రి సొల్యూషన్స్ ప్రైవేట్ లిమిటెడ్ రైతులకు పంట పోషణ, మొక్కల పెరుగుదల మరియు జీవ ఆధారిత పంట రక్షణ పరిష్కారాలను అందించడానికి కట్టుబడి ఉన్న వ్యవసాయ కేంద్రిత సంస్థ."),
  about2: b("Our product portfolio is designed to support healthy plant growth, efficient nutrient utilization, flowering and fruit development, and integrated pest management (IPM). We focus on practical solutions that can be incorporated into modern farming practices and help farmers manage different crop requirements effectively.", "మా ఉత్పత్తుల శ్రేణి ఆరోగ్యకరమైన మొక్కల పెరుగుదల, సమర్థవంతమైన పోషక వినియోగం, పుష్పించడం, పండ్ల అభివృద్ధి మరియు సమగ్ర సస్యరక్షణ (IPM)కు తోడ్పడేలా రూపొందించబడింది. ఆధునిక వ్యవసాయ పద్ధతుల్లో భాగం చేసుకోగల ఆచరణాత్మక పరిష్కారాలపై మేము దృష్టి పెడతాము."),
  discover: b("Discover Stemgrow", "స్టెమ్‌గ్రోను తెలుసుకోండి"), approachEyebrow: b("THE STEMGROW WAY", "స్టెమ్‌గ్రో విధానం"), approachTitle: b("Our Approach", "మా విధానం"), approachCopy: b("Balanced nutrition. Healthy crops. Responsible crop management.", "సమతుల్య పోషణ. ఆరోగ్యకరమైన పంటలు. బాధ్యతాయుత పంట నిర్వహణ."),
  categoryEyebrow: b("OUR SOLUTION AREAS", "మా పరిష్కార విభాగాలు"), categoryTitle: b("Solutions Designed Around Crop Needs", "పంట అవసరాలకు అనుగుణంగా రూపొందించిన పరిష్కారాలు"), categoryCopy: b("A focused portfolio for nutrition, growth, biological protection and crop development.", "పోషణ, పెరుగుదల, జీవ రక్షణ మరియు పంట అభివృద్ధి కోసం కేంద్రీకృత ఉత్పత్తుల శ్రేణి."),
  catalogEyebrow: b("FOCUSED PORTFOLIO", "ఎంపిక చేసిన ఉత్పత్తుల శ్రేణి"), catalogTitle: b("Our Products", "మా ఉత్పత్తులు"), catalogCopy: b("Agricultural solutions developed for different crop requirements.", "వివిధ పంట అవసరాల కోసం రూపొందించిన వ్యవసాయ పరిష్కారాలు."),
  farmerEyebrow: b("FARMER-FIRST THINKING", "రైతు-మొదటి ఆలోచన"), farmerTitle: b("Built Around Real Crop Needs", "రైతుల పంట అవసరాలను దృష్టిలో పెట్టుకుని రూపొందించిన పరిష్కారాలు"), farmerCopy: b("A practical way to navigate the crop stages and needs that shape our portfolio.", "మా ఉత్పత్తుల శ్రేణిని రూపొందించే పంట దశలు, అవసరాలను అర్థం చేసుకోవడానికి ఆచరణాత్మక మార్గం."),
  whyEyebrow: b("DESIGNED FOR THE FIELD", "పొలం కోసం రూపొందించబడింది"), whyTitle: b("Why Stemgrow?", "ఎందుకు స్టెమ్‌గ్రో?"), whyCopy: b("A clear, practical approach to crop nutrition, growth and protection.", "పంట పోషణ, పెరుగుదల, రక్షణకు స్పష్టమైన, ఆచరణాత్మక విధానం."),
  testimonialEyebrow: b("STEMGROW COMMUNITY", "స్టెమ్‌గ్రో సమాజం"), testimonialTitle: b("Farmer Experiences", "రైతుల అనుభవాలు"), testimonialCopy: b("Real experiences from Stemgrow customers will be added here.", "స్టెమ్‌గ్రో వినియోగదారుల నిజమైన అనుభవాలు ఇక్కడ జోడించబడతాయి."), testimonialSmall: b("A dedicated space for verified farmer feedback.", "ధృవీకరించిన రైతుల అభిప్రాయాల కోసం ప్రత్యేక వేదిక."),
  resourcesEyebrow: b("RESOURCES", "వనరులు"), insightsTitle: b("Agriculture Insights", "వ్యవసాయ అవగాహన"), insightsCopy: b("A structured resource area, ready for future articles and practical guidance.", "భవిష్యత్ వ్యాసాలు, ఆచరణాత్మక మార్గదర్శకాల కోసం సిద్ధంగా ఉన్న వనరుల విభాగం."),
  ctaEyebrow: b("LET’S FIND THE RIGHT FIT", "సరైన పరిష్కారాన్ని కనుగొందాం"), ctaTitle: b("Looking for the Right Solution for Your Crop?", "మీ పంటకు సరైన పరిష్కారం కోసం చూస్తున్నారా?"), ctaCopy: b("Talk to Stemgrow Agri Solutions about your crop requirements and explore suitable agricultural solutions.", "మీ పంట అవసరాల గురించి స్టెమ్‌గ్రో అగ్రి సొల్యూషన్స్‌తో మాట్లాడండి మరియు అనుకూల వ్యవసాయ పరిష్కారాలను తెలుసుకోండి."),
  contactEyebrow: b("CONTACT STEMGROW", "స్టెమ్‌గ్రోను సంప్రదించండి"), contactTitle: b("Let’s Grow Together", "కలిసి ఎదుగుదాం"), contactCopy: b("Share your crop requirement with us. We are here to help you explore the right Stemgrow solution.", "మీ పంట అవసరాన్ని మాతో పంచుకోండి. సరైన స్టెమ్‌గ్రో పరిష్కారాన్ని తెలుసుకోవడంలో మేము సహాయపడతాము."),
  mapTitle: b("Company location", "కంపెనీ స్థానం"), directions: b("Get Directions", "దిశలు పొందండి"), viewMap: b("View on Google Maps", "గూగుల్ మ్యాప్స్‌లో చూడండి"), call: b("Call Now", "కాల్ చేయండి"), email: b("Email Us", "ఇమెయిల్ పంపండి"),
  name: b("Name", "పేరు"), phone: b("Mobile Number", "మొబైల్ నంబర్"), product: b("Product", "ఉత్పత్తి"), crop: b("Crop / Requirement", "పంట / అవసరం"), message: b("Message", "సందేశం"), send: b("Send Enquiry", "విచారణ పంపండి"), sending: b("Preparing Enquiry…", "విచారణను సిద్ధం చేస్తున్నాము…"),
  namePlaceholder: b("Your name", "మీ పేరు"), emailPlaceholder: b("name@example.com", "మీ ఇమెయిల్"), cropPlaceholder: b("Crop or requirement", "పంట లేదా అవసరం"), messagePlaceholder: b("Tell us how we can help", "మీ అవసరం గురించి మాకు తెలియజేయండి"),
  formError: b("Please complete every field and enter a valid 10-digit mobile number and email address.", "దయచేసి అన్ని వివరాలను నమోదు చేసి, సరైన 10 అంకెల మొబైల్ నంబర్ మరియు ఇమెయిల్ చిరునామాను ఇవ్వండి."), formSuccess: b("Thank you. Your enquiry is ready in your email app — please send it to contact our team.", "ధన్యవాదాలు. మీ విచారణ ఇమెయిల్ యాప్‌లో సిద్ధంగా ఉంది — మా బృందాన్ని సంప్రదించడానికి దయచేసి పంపండి."),
  footerCopy: b("Practical agricultural solutions for crop nutrition, plant growth and biological crop protection.", "పంట పోషణ, మొక్కల పెరుగుదల మరియు జీవ ఆధారిత పంట రక్షణకు ఆచరణాత్మక వ్యవసాయ పరిష్కారాలు."), footerNav: b("Navigate", "నావిగేషన్"), footerProducts: b("Products", "ఉత్పత్తులు"), footerContact: b("Contact", "సంప్రదించండి"), copyright: b("© 2026 STEMGROW AGRI SOLUTIONS PRIVATE LIMITED. All rights reserved.", "© 2026 స్టెమ్‌గ్రో అగ్రి సొల్యూషన్స్ ప్రైవేట్ లిమిటెడ్. అన్ని హక్కులూ ప్రత్యేకించబడినవి."),
  policy: b("Use according to product label and recommended application practices.", "ఉత్పత్తి లేబుల్ మరియు సిఫార్సు చేసిన వినియోగ పద్ధతుల ప్రకారం ఉపయోగించండి."), view: b("View details", "వివరాలు చూడండి"), viewProducts: b("View products", "ఉత్పత్తులు చూడండి"), benefits: b("Benefits", "ప్రయోజనాలు"), composition: b("Composition / formulation", "కూర్పు / ఫార్ములేషన్"), application: b("Application", "వినియోగం"), dosage: b("Dosage", "మోతాదు"), method: b("Application method", "వినియోగ పద్ధతి"), enquiry: b("Enquire About This Product", "ఈ ఉత్పత్తి గురించి విచారించండి"), close: b("Close product details", "ఉత్పత్తి వివరాలను మూసివేయండి"), menu: b("Toggle menu", "మెనూ తెరవండి"), noProducts: b("No products found in this category.", "ఈ వర్గంలో ఉత్పత్తులు లేవు.")
};

const categoryLabels = {
  nutrition: b("Crop Nutrition & Soil Health", "పంట పోషణ & నేల ఆరోగ్యం"),
  growth: b("Plant Growth & Flowering Support", "మొక్కల పెరుగుదల & పుష్పించే దశకు మద్దతు"),
  biological: b("Biological Crop Protection", "జీవ ఆధారిత పంట రక్షణ"),
  protection: b("Plant Protection & Crop Development", "మొక్కల రక్షణ & పంట అభివృద్ధి")
};

const products = [
  { id: "stemgrow-plus", name: "STEMGROW PLUS", category: "nutrition", image: "/products/source-extracts/page-01-image-06.jpeg", description: b("Mycorrhizal biofertilizer for root development, nutrient uptake and soil vitality.", "వేర్ల అభివృద్ధి, పోషకాల గ్రహణం మరియు నేల సారానికి తోడ్పడే మైకోరైజల్ బయోఫర్టిలైజర్."), overview: b("A formulation containing VAM, humic acid, fulvic acid, seaweed, amino acids and vitamins, positioned to support healthy root and plant development.", "VAM, హ్యూమిక్ యాసిడ్, ఫుల్విక్ యాసిడ్, సీవీడ్, అమినో యాసిడ్లు మరియు విటమిన్లతో కూడిన ఈ ఉత్పత్తి వేర్లు, మొక్కల ఆరోగ్యకరమైన అభివృద్ధికి తోడ్పడేలా రూపొందించబడింది."), formulation: b("VAM, Humic Acid, Fulvic Acid, Seaweed, Amino Acids & Vitamins. Mycorrhizal Biofertilizer.", "VAM, హ్యూమిక్ యాసిడ్, ఫుల్విక్ యాసిడ్, సీవీడ్, అమినో యాసిడ్లు & విటమిన్లు. మైకోరైజల్ బయోఫర్టిలైజర్."), benefits: [b("Supports root growth and development.", "వేర్ల పెరుగుదల, అభివృద్ధికి తోడ్పడుతుంది."), b("Supports water, phosphorus and nutrient uptake.", "నీరు, ఫాస్ఫరస్ మరియు ఇతర పోషకాల గ్రహణానికి తోడ్పడుతుంది."), b("Supports soil fertility and microbial activity.", "నేల సారం, సూక్ష్మజీవుల క్రియాశీలతకు తోడ్పడుతుంది.")], application: b("Refer to product label and recommended application practices.", "ఉత్పత్తి లేబుల్ మరియు సిఫార్సు చేసిన వినియోగ పద్ధతులను అనుసరించండి."), dosage: b("4–8 kg", "4–8 కిలోలు"), method: b("Use according to product label.", "ఉత్పత్తి లేబుల్ ప్రకారం వినియోగించండి.") },
  { id: "n-cure", name: "N-CURE", category: "nutrition", image: "/products/source-extracts/page-01-image-08.jpeg", description: b("EDTA chelated mix micronutrient for efficient nutrient availability and crop support.", "పోషకాల సమర్థవంతమైన లభ్యత, పంట అభివృద్ధికి తోడ్పడే EDTA చిలేటెడ్ మిక్స్ మైక్రోన్యూట్రియెంట్."), overview: b("A 100% water-soluble EDTA chelated mix micronutrient fertilizer designed for nutrient absorption through foliar spray and drip irrigation.", "ఆకులపై పిచికారీ, డ్రిప్ ఇరిగేషన్ ద్వారా పోషకాల గ్రహణానికి తోడ్పడే 100% నీటిలో కరిగే EDTA చిలేటెడ్ మిక్స్ మైక్రోన్యూట్రియెంట్ ఎరువు."), formulation: b("EDTA Chelated Mix Micronutrient.", "EDTA చిలేటెడ్ మిక్స్ మైక్రోన్యూట్రియెంట్."), benefits: [b("Supports rapid, efficient micronutrient availability.", "సూక్ష్మ పోషకాలు వేగంగా, సమర్థవంతంగా అందుబాటులోకి రావడానికి తోడ్పడుతుంది."), b("Supports crop growth, flowering and fruiting.", "పంట పెరుగుదల, పుష్పించడం, కాయలు/పండ్ల అభివృద్ధికి తోడ్పడుతుంది."), b("Supports management of certain nutrient deficiencies.", "కొన్ని పోషక లోపాల నిర్వహణకు తోడ్పడుతుంది.")], application: b("Foliar spray and soil application through drip / drenching.", "ఆకులపై పిచికారీ మరియు డ్రిప్ / డ్రెంచింగ్ ద్వారా నేల వినియోగం."), dosage: b("Foliar: 1 g per litre of water. Drip / drenching: 250–500 g per acre.", "ఆకులపై పిచికారీ: లీటరు నీటికి 1 గ్రా. డ్రిప్ / డ్రెంచింగ్: ఎకరానికి 250–500 గ్రా."), method: b("Foliar spray; drip irrigation or drenching.", "ఆకులపై పిచికారీ; డ్రిప్ ఇరిగేషన్ లేదా డ్రెంచింగ్.") },
  { id: "bloomix", name: "BLOOMIX", category: "growth", image: "/products/source-extracts/page-01-image-04.jpeg", description: b("Vitamin B3 liquid formulated to support plant growth, flowering and fruit set.", "మొక్కల పెరుగుదల, పుష్పించడం, కాయల ఏర్పాటుకు తోడ్పడే విటమిన్ B3 ద్రవ ఉత్పత్తి."), overview: b("A Vitamin B3 (Nicotinamide) 3.25% liquid presented for plant growth, healthy branching, flowering support and fruit development.", "మొక్కల పెరుగుదల, ఆరోగ్యకరమైన కొమ్మలు, పుష్పించడం మరియు పండు/కాయ అభివృద్ధికి తోడ్పడే విటమిన్ B3 (నికోటినమైడ్) 3.25% ద్రవ ఉత్పత్తి."), formulation: b("Vitamin B3 (Nicotinamide) 3.25% liquid.", "విటమిన్ B3 (నికోటినమైడ్) 3.25% ద్రవం."), benefits: [b("Supports vigorous plant growth and healthy branching.", "మొక్కల సమగ్ర పెరుగుదల, ఆరోగ్యకరమైన కొమ్మలకు తోడ్పడుతుంది."), b("Supports even flowering and fruit set.", "సమాన పుష్పించడం, కాయల ఏర్పాటుకు తోడ్పడుతుంది."), b("Supports plant vigour during key crop stages.", "ముఖ్యమైన పంట దశల్లో మొక్కల బలానికి తోడ్పడుతుంది.")], application: b("Foliar spray.", "ఆకులపై పిచికారీ."), dosage: b("50–100 ml per acre, as spray.", "ఎకరానికి 50–100 మి.లీ. పిచికారీ."), method: b("Foliar spray.", "ఆకులపై పిచికారీ.") },
  { id: "growflow", name: "GROWFLOW", category: "growth", image: "/products/source-extracts/page-02-image-08.jpeg", description: b("Vitamin B3 liquid formulated to support growth, flowering and fruit quality.", "మొక్కల పెరుగుదల, పుష్పించడం, పండ్లు/కాయల నాణ్యతకు తోడ్పడే విటమిన్ B3 ద్రవ ఉత్పత్తి."), overview: b("A Vitamin B3 (Nicotinamide) 3.25% liquid presented for plant growth, branching, flowering, fruit quality and tolerance to biotic and abiotic stress.", "మొక్కల పెరుగుదల, కొమ్మల అభివృద్ధి, పుష్పించడం, పండ్లు/కాయల నాణ్యత, జీవ మరియు అజీవ ఒత్తిడులను తట్టుకునే సామర్థ్యానికి తోడ్పడే విటమిన్ B3 (నికోటినమైడ్) 3.25% ద్రవ ఉత్పత్తి."), formulation: b("Vitamin B3 (Nicotinamide) 3.25% liquid.", "విటమిన్ B3 (నికోటినమైడ్) 3.25% ద్రవం."), benefits: [b("Supports plant growth and branch development.", "మొక్కల పెరుగుదల, కొమ్మల అభివృద్ధికి తోడ్పడుతుంది."), b("Supports flowering and fruit development.", "పుష్పించడం, కాయలు/పండ్ల అభివృద్ధికి తోడ్పడుతుంది."), b("Supports fruit and vegetable quality.", "పండ్లు, కూరగాయల నాణ్యతకు తోడ్పడుతుంది.")], application: b("Foliar spray.", "ఆకులపై పిచికారీ."), dosage: b("50–100 ml per acre, as spray.", "ఎకరానికి 50–100 మి.లీ. పిచికారీ."), method: b("Foliar spray.", "ఆకులపై పిచికారీ.") },
  { id: "tridofor", name: "TRIDOFOR", category: "biological", image: "/products/source-extracts/page-02-image-02.jpeg", description: b("Biological insect management for susceptible insect pests as part of IPM practices.", "IPM విధానాల్లో భాగంగా అనుకూల కీటక తెగుళ్ల జీవ నిర్వహణకు ఉపయోగపడే ఉత్పత్తి."), overview: b("A biological crop-protection product containing entomopathogenic fungi, positioned for management of susceptible insect pests including sap-sucking pests as part of IPM practices.", "ఎంటోమోపథోజెనిక్ శిలీంధ్రాలతో కూడిన జీవ ఆధారిత పంట రక్షణ ఉత్పత్తి. IPM విధానాల్లో భాగంగా రసం పీల్చే పురుగులు వంటి అనుకూల కీటక తెగుళ్ల నిర్వహణకు ఉపయోగపడేలా రూపొందించబడింది."), formulation: b("Verticillium lecanii, Beauveria bassiana & Metarhizium anisopliae.", "వెర్టిసిలియం లెకానీ, బ్యూవేరియా బస్సియానా & మెటారైజియం అనిసోప్లియే."), benefits: [b("Positioned for biological management of susceptible insect pests.", "అనుకూల కీటక తెగుళ్ల జీవ నిర్వహణకు ఉపయోగపడేలా రూపొందించబడింది."), b("Includes positioning for aphids, whiteflies, thrips and mealybugs.", "అఫిడ్స్, తెల్లదోమ, త్రిప్స్, మీలీబగ్స్ వంటి పురుగుల నిర్వహణకు ఉద్దేశించబడింది."), b("Suitable within integrated pest management practices.", "సమగ్ర సస్యరక్షణ (IPM) విధానాల్లో ఉపయోగించడానికి అనుకూలం.")], application: b("Foliar spray and soil application through drip / drenching.", "ఆకులపై పిచికారీ మరియు డ్రిప్ / డ్రెంచింగ్ ద్వారా నేల వినియోగం."), dosage: b("Foliar: 2.5 ml per litre of water. Drip / drenching: 1–2 litres per acre.", "ఆకులపై పిచికారీ: లీటరు నీటికి 2.5 మి.లీ. డ్రిప్ / డ్రెంచింగ్: ఎకరానికి 1–2 లీటర్లు."), method: b("Foliar spray; drip irrigation or drenching.", "ఆకులపై పిచికారీ; డ్రిప్ ఇరిగేషన్ లేదా డ్రెంచింగ్.") },
  { id: "oriza", name: "ORIZA", category: "biological", image: "/products/source-extracts/page-02-image-04.jpeg", description: b("Biological insect management for susceptible insect pests within IPM practices.", "IPM విధానాల్లో అనుకూల కీటక తెగుళ్ల జీవ నిర్వహణకు ఉపయోగపడే ఉత్పత్తి."), overview: b("A biological insect-management product based on entomopathogenic fungi, positioned for susceptible insect pests including sap-sucking pests and certain Lepidoptera and Diptera groups as part of IPM.", "ఎంటోమోపథోజెనిక్ శిలీంధ్రాల ఆధారిత జీవ కీటక నిర్వహణ ఉత్పత్తి. IPMలో భాగంగా రసం పీల్చే పురుగులు మరియు కొన్ని లెపిడాప్టెరా, డిప్టెరా వర్గాల అనుకూల పురుగుల నిర్వహణకు ఉపయోగపడేలా రూపొందించబడింది."), formulation: b("Verticillium lecanii, Beauveria bassiana & Metarhizium anisopliae.", "వెర్టిసిలియం లెకానీ, బ్యూవేరియా బస్సియానా & మెటారైజియం అనిసోప్లియే."), benefits: [b("Positioned for biological management of susceptible insect pests.", "అనుకూల కీటక తెగుళ్ల జీవ నిర్వహణకు ఉపయోగపడేలా రూపొందించబడింది."), b("Includes sap-sucking pests and certain Lepidoptera and Diptera groups.", "రసం పీల్చే పురుగులు, కొన్ని లెపిడాప్టెరా మరియు డిప్టెరా వర్గాల పురుగుల నిర్వహణకు ఉద్దేశించబడింది."), b("Suitable for preventive and early-stage IPM use.", "నివారణాత్మక, ప్రారంభ దశ IPM వినియోగానికి అనుకూలం.")], application: b("Foliar spray and soil application through drip / drenching.", "ఆకులపై పిచికారీ మరియు డ్రిప్ / డ్రెంచింగ్ ద్వారా నేల వినియోగం."), dosage: b("Foliar: 2.5 ml per litre of water. Drip / drenching: 1–2 litres per acre.", "ఆకులపై పిచికారీ: లీటరు నీటికి 2.5 మి.లీ. డ్రిప్ / డ్రెంచింగ్: ఎకరానికి 1–2 లీటర్లు."), method: b("Foliar spray; drip irrigation or drenching.", "ఆకులపై పిచికారీ; డ్రిప్ ఇరిగేషన్ లేదా డ్రెంచింగ్.") },
  { id: "reflector", name: "REFLECTOR", category: "protection", image: "/products/source-extracts/page-02-image-06.jpeg", description: b("Phosphorus and potassium formulation supporting plant disease-resistance mechanisms.", "మొక్కల సహజ వ్యాధి నిరోధక యంత్రాంగాలకు తోడ్పడే ఫాస్ఫరస్, పొటాషియం ఆధారిత ఉత్పత్తి."), overview: b("A Potassium Salt of Phosphonic Acid 40% formulation presented for phosphorus and potassium nutrition, plant disease-resistance mechanisms, flowering and fruit development support.", "ఫాస్ఫరస్, పొటాషియం పోషణ, మొక్కల వ్యాధి నిరోధక యంత్రాంగాలు, పుష్పించడం మరియు కాయలు/పండ్ల అభివృద్ధికి తోడ్పడే పొటాషియం సాల్ట్ ఆఫ్ ఫాస్ఫోనిక్ యాసిడ్ 40% ఉత్పత్తి."), formulation: b("Potassium Salt of Phosphonic Acid 40%.", "పొటాషియం సాల్ట్ ఆఫ్ ఫాస్ఫోనిక్ యాసిడ్ 40%."), benefits: [b("Phosphorus and potassium-based formulation.", "ఫాస్ఫరస్, పొటాషియం ఆధారిత ఉత్పత్తి."), b("Supports plant disease-resistance mechanisms.", "మొక్కల సహజ వ్యాధి నిరోధక యంత్రాంగాలకు తోడ్పడుతుంది."), b("Supports flowering and fruit development.", "పుష్పించడం, కాయలు/పండ్ల అభివృద్ధికి తోడ్పడుతుంది.")], application: b("Foliar spray; absorbed and translocated through roots and leaves.", "ఆకులపై పిచికారీ; వేర్లు, ఆకుల ద్వారా గ్రహించబడి మొక్కలో ప్రసరిస్తుంది."), dosage: b("1–2 litres per acre, as foliar spray.", "ఎకరానికి 1–2 లీటర్లు, ఆకులపై పిచికారీగా."), method: b("Foliar spray.", "ఆకులపై పిచికారీ.") }
];

const approach = [
  ["01", "↗", b("Healthy Root & Plant Development", "ఆరోగ్యకరమైన వేర్లు & మొక్కల అభివృద్ధి"), b("A strong crop starts with a strong foundation.", "బలమైన పంటకు బలమైన పునాది అవసరం.")],
  ["02", "◌", b("Efficient Nutrient Utilization", "సమర్థవంతమైన పోషక వినియోగం"), b("Helping crops use nutrition more effectively.", "పంటలు పోషకాలను సమర్థవంతంగా ఉపయోగించుకోవడానికి తోడ్పాటు.")],
  ["03", "⌁", b("Crop Growth & Vigour", "పంట పెరుగుదల & బలం"), b("Practical support through important crop stages.", "ముఖ్యమైన పంట దశల్లో ఆచరణాత్మక మద్దతు.")],
  ["04", "✦", b("Flowering & Fruit Development", "పుష్పించడం & పండ్ల అభివృద్ధి"), b("Focused solutions for reproductive crop stages.", "పంట పుష్పించే దశల కోసం లక్ష్యిత పరిష్కారాలు.")],
  ["05", "◒", b("Biological Pest Management", "జీవ కీటక నిర్వహణ"), b("Responsible options within IPM practices.", "IPM విధానాల్లో బాధ్యతాయుతమైన ఎంపికలు.")],
  ["06", "⊞", b("Integrated Crop Management", "సమగ్ర పంట నిర్వహణ"), b("Nutrition, growth and protection considered together.", "పోషణ, పెరుగుదల, రక్షణను సమగ్రంగా పరిగణించడం.")]
];

const categories = [
  ["01", "nutrition", b("Crop Nutrition & Soil Health", "పంట పోషణ & నేల ఆరోగ్యం"), "Stemgrow Plus · N-Cure", b("Solutions supporting root development, nutrient availability and crop growth.", "వేర్ల అభివృద్ధి, పోషకాల లభ్యత, పంట పెరుగుదలకు తోడ్పడే పరిష్కారాలు.")],
  ["02", "growth", b("Plant Growth & Flowering Support", "మొక్కల పెరుగుదల & పుష్పించే దశకు మద్దతు"), "Bloomix · GrowFlow", b("Vitamin B3 (Nicotinamide) 3.25% formulations for growth, flowering and fruit development.", "మొక్కల పెరుగుదల, పుష్పించడం, కాయలు/పండ్ల అభివృద్ధికి విటమిన్ B3 (నికోటినమైడ్) 3.25% ఉత్పత్తులు.")],
  ["03", "biological", b("Biological Crop Protection", "జీవ ఆధారిత పంట రక్షణ"), "Tridofor · Oriza", b("Entomopathogenic fungi-based products for susceptible insect pests within IPM practices.", "IPM విధానాల్లో అనుకూల కీటక తెగుళ్ల కోసం ఎంటోమోపథోజెనిక్ శిలీంధ్రాల ఆధారిత ఉత్పత్తులు.")],
  ["04", "protection", b("Plant Protection & Crop Development", "మొక్కల రక్షణ & పంట అభివృద్ధి"), "Reflector", b("Phosphorus and potassium formulation supporting plant disease-resistance mechanisms.", "మొక్కల వ్యాధి నిరోధక యంత్రాంగాలకు తోడ్పడే ఫాస్ఫరస్, పొటాషియం ఉత్పత్తి.")]
];

const needs = [
  ["01", "⌇", b("Root Development", "వేర్ల అభివృద్ధి"), b("A strong foundation for crop development.", "పంట అభివృద్ధికి బలమైన పునాది.")],
  ["02", "◌", b("Nutrient Management", "పోషక నిర్వహణ"), b("Helping nutrition reach the crop effectively.", "పోషకాలు పంటకు సమర్థవంతంగా చేరడానికి తోడ్పాటు.")],
  ["03", "↗", b("Plant Growth", "మొక్కల పెరుగుదల"), b("Practical support across key crop stages.", "ముఖ్యమైన పంట దశల్లో ఆచరణాత్మక మద్దతు.")],
  ["04", "✦", b("Flowering", "పుష్పించడం"), b("Focused attention through flowering stages.", "పుష్పించే దశల్లో కేంద్రీకృత మద్దతు.")],
  ["05", "●", b("Fruit Development", "పండ్ల అభివృద్ధి"), b("Support for developing fruit and crop quality.", "కాయలు, పండ్ల అభివృద్ధి మరియు పంట నాణ్యతకు మద్దతు.")],
  ["06", "◒", b("Biological Protection", "జీవ ఆధారిత రక్షణ"), b("Responsible options within IPM practices.", "IPM విధానాల్లో బాధ్యతాయుతమైన ఎంపికలు.")]
];
const why = [["01", b("Practical Solutions", "ఆచరణాత్మక పరిష్కారాలు"), b("Solutions designed around crop requirements.", "పంట అవసరాలను దృష్టిలో పెట్టుకుని రూపొందించిన పరిష్కారాలు.")], ["02", b("Balanced Approach", "సమతుల్య విధానం"), b("Nutrition, plant growth and crop protection considered together.", "పోషణ, మొక్కల పెరుగుదల, పంట రక్షణను సమగ్రంగా పరిగణిస్తాము.")], ["03", b("Modern Agriculture", "ఆధునిక వ్యవసాయం"), b("Compatible with modern crop-management practices.", "ఆధునిక పంట నిర్వహణ పద్ధతులకు అనుకూలమైన పరిష్కారాలు.")], ["04", b("Farmer Focused", "రైతు కేంద్రిత"), b("Designed around practical agricultural requirements.", "ఆచరణాత్మక వ్యవసాయ అవసరాల ఆధారంగా రూపొందించబడింది.")]];
const insights = [["01", b("Crop Nutrition", "పంట పోషణ"), b("A future home for practical crop-nutrition guidance.", "పంట పోషణపై ఆచరణాత్మక మార్గదర్శకానికి భవిష్యత్తు వేదిక.")], ["02", b("Plant Growth", "మొక్కల పెరుగుదల"), b("Resources can be added as crop-stage guidance develops.", "పంట దశల మార్గదర్శకం అభివృద్ధి చెందుతున్న కొద్దీ వనరులను జోడించవచ్చు.")], ["03", b("Biological Crop Protection", "జీవ ఆధారిత పంట రక్షణ"), b("A space for responsible crop-protection knowledge.", "బాధ్యతాయుత పంట రక్షణ జ్ఞానానికి ఒక వేదిక.")], ["04", b("Integrated Pest Management", "సమగ్ర కీటక నిర్వహణ"), b("Future articles can be structured here.", "భవిష్యత్ వ్యాసాలను ఇక్కడ క్రమబద్ధీకరించవచ్చు.")]];

const nav = [["home", ui.navHome], ["about", ui.navAbout], ["solutions", ui.navSolutions], ["products", ui.navProducts], ["approach", ui.navApproach], ["contact", ui.navContact]];
const filters = [["all", b("All Products", "అన్ని ఉత్పత్తులు")], ["nutrition", b("Crop Nutrition", "పంట పోషణ")], ["growth", b("Plant Growth", "మొక్కల పెరుగుదల")], ["biological", b("Biological Crop Protection", "జీవ ఆధారిత పంట రక్షణ")], ["protection", b("Plant Protection", "మొక్కల రక్షణ")]];

function logo(light = false) {
  return `<a class="logo ${light ? "logo--light" : ""}" href="#home" data-scroll="home" aria-label="Stemgrow Agri Solutions home">
    <svg class="logo__mark" viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="28" r="26" fill="currentColor" opacity=".14"/><path d="M28 45C17 40 12 31 14 14c15-1 25 7 25 19 0 5-2 9-5 12-1-8-5-13-12-18 4 6 6 12 6 18Z" fill="currentColor"/><path d="M28 45c1-10 6-17 16-22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
    <span class="logo__copy"><strong>STEMGROW</strong><small>AGRI SOLUTIONS</small></span></a>`;
}

function arrow() { return `<span class="arrow" aria-hidden="true">→</span>`; }

function languageSwitcher(compact = false) {
  return `<div class="language-switcher ${compact ? "language-switcher--compact" : ""}" role="group" aria-label="Choose website language">
    <button type="button" data-lang="en" class="${locale === "en" ? "is-active" : ""}" aria-pressed="${locale === "en"}">EN</button>
    <button type="button" data-lang="te" class="${locale === "te" ? "is-active" : ""}" aria-pressed="${locale === "te"}">తెలుగు</button>
  </div>`;
}

function heading(eyebrow, title, copy = "", centered = false) {
  return `<div class="section-heading ${centered ? "section-heading--center" : ""}">
    ${eyebrow ? `<p class="eyebrow">${pick(eyebrow)}</p>` : ""}<h2>${pick(title)}</h2>${copy ? `<p>${pick(copy)}</p>` : ""}
  </div>`;
}

function productCard(product) {
  return `<article class="product-card">
    <div class="product-card__visual"><span class="product-card__category">${pick(categoryLabels[product.category])}</span><div class="product-card__halo"></div><img src="${product.image}" alt="${product.name} agricultural product package" loading="lazy"></div>
    <div class="product-card__content"><h3>${product.name}</h3><p>${pick(product.description)}</p>
      <div class="product-card__footer"><span class="product-card__application"><em>${pick(ui.application)}</em>${pick(product.method)}</span><button type="button" data-product="${product.id}" aria-label="${pick(ui.view)} ${product.name}">${pick(ui.view)}${arrow()}</button></div>
    </div>
  </article>`;
}

function productModal() {
  const product = products.find((entry) => entry.id === selectedProduct);
  if (!product) return "";
  return `<div class="modal-backdrop" data-modal-backdrop role="presentation">
    <section class="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title">
      <button class="modal-close" type="button" data-close-modal aria-label="${pick(ui.close)}">×</button>
      <div class="product-modal__visual"><div class="product-modal__ring"></div><img src="${product.image}" alt="${product.name} product pack"><span>${pick(categoryLabels[product.category])}</span></div>
      <div class="product-modal__content"><p class="eyebrow">${pick(categoryLabels[product.category])}</p><h2 id="product-modal-title">${product.name}</h2><p class="modal-intro">${pick(product.overview)}</p>
        <div class="modal-facts">
          <div><span>${pick(ui.composition)}</span><strong>${pick(product.formulation)}</strong></div>
          <div><span>${pick(ui.application)}</span><strong>${pick(product.application)}</strong></div>
          <div><span>${pick(ui.dosage)}</span><strong>${pick(product.dosage)}</strong></div>
          <div><span>${pick(ui.method)}</span><strong>${pick(product.method)}</strong></div>
        </div>
        <div class="modal-benefits"><h3>${pick(ui.benefits)}</h3><ul>${product.benefits.map((benefit) => `<li>${pick(benefit)}</li>`).join("")}</ul></div>
        <div class="modal-actions"><button class="button button--green" type="button" data-enquire-product="${product.id}">${pick(ui.enquiry)}${arrow()}</button><a class="button button--outline" href="tel:+919133243325">${pick(ui.call)}</a><a class="modal-whatsapp" href="https://wa.me/919133243325?text=${encodeURIComponent(`Hello Stemgrow, I would like to enquire about ${product.name}.`)}" target="_blank" rel="noreferrer">WhatsApp</a></div><p class="label-note">${pick(ui.policy)}</p>
      </div>
    </section>
  </div>`;
}

function render() {
  document.documentElement.lang = locale === "en" ? "en" : "te";
  const shownProducts = filter === "all" ? products : products.filter((product) => product.category === filter);
  root.className = `app ${locale === "te" ? "app--telugu" : ""}`;
  root.innerHTML = `
    <header class="site-header" id="site-header"><div class="container header-inner">
      ${logo()}<nav class="desktop-nav" aria-label="Primary navigation">${nav.map(([id, label]) => `<button type="button" data-scroll="${id}">${pick(label)}</button>`).join("")}<button type="button" class="mobile-nav-cta" data-scroll="contact">${pick(ui.talk)}${arrow()}</button></nav>
      <div class="header-actions">${languageSwitcher(true)}<button type="button" class="button button--gold header-contact" data-scroll="contact">${pick(ui.contact)}${arrow()}</button><button class="menu-toggle" type="button" data-menu aria-label="${pick(ui.menu)}" aria-expanded="false"><span></span><span></span><span></span></button></div>
    </div></header>

    <main>
      <section class="hero" id="home"><div class="hero__media" role="img" aria-label="${locale === "en" ? "Healthy agricultural crop field" : "ఆరోగ్యకరమైన వ్యవసాయ పంట పొలం"}"></div><div class="hero__overlay"></div>
        <div class="container hero__content"><p class="eyebrow eyebrow--light">${pick(ui.heroLabel)}</p><h1><span>${pick(ui.heroLead)}</span><span class="hero__gold">${pick(ui.heroTail)}</span></h1><p class="hero__copy">${pick(ui.heroCopy)}</p>
          <div class="hero__actions"><button class="button button--gold" type="button" data-scroll="products">${pick(ui.explore)}${arrow()}</button><button class="button button--ghost" type="button" data-scroll="contact">${pick(ui.talk)}</button></div>
          <button class="text-link text-link--light" type="button" data-scroll="solutions">${pick(ui.viewSolutions)}${arrow()}</button><span class="hero-scroll" aria-hidden="true"><i></i>${locale === "en" ? "Scroll to explore" : "చూడటానికి స్క్రోల్ చేయండి"}</span>
        </div><div class="hero__leaf" aria-hidden="true"></div>
        <div class="hero__trust"><div class="container trust-grid"><div><strong>${pick(ui.nutrition)}</strong></div><div><strong>${pick(ui.growth)}</strong></div><div><strong>${pick(ui.biological)}</strong></div></div></div>
      </section>

      <section class="section about" id="about"><div class="container about-grid"><div class="about-visual reveal"><div class="about-visual__photo" role="img" aria-label="${locale === "en" ? "Close view of crops growing in a field" : "పొలంలో పెరుగుతున్న పంటల సమీప దృశ్యం"}"></div><div class="about-visual__card"><span>STEMGROW</span><strong>${locale === "en" ? "For crop needs, field by field." : "పంట అవసరాలకు, పొలం పొలంగా."}</strong></div><span class="about-visual__accent"></span></div>
        <div class="about-copy reveal">${heading(ui.aboutEyebrow, ui.aboutTitle)}<p>${pick(ui.about1)}</p><p>${pick(ui.about2)}</p><div class="chip-list">${[b("Healthy Crop Development", "ఆరోగ్యకరమైన పంట అభివృద్ధి"), b("Efficient Nutrient Utilization", "సమర్థవంతమైన పోషక వినియోగం"), b("Plant Growth Support", "మొక్కల పెరుగుదలకు మద్దతు"), b("Integrated Crop Management", "సమగ్ర పంట నిర్వహణ")].map((chip) => `<span>✓ ${pick(chip)}</span>`).join("")}</div><button class="text-link" type="button" data-scroll="approach">${pick(ui.discover)}${arrow()}</button></div>
      </div></section>

      <section class="section approach" id="approach"><div class="container">${heading(ui.approachEyebrow, ui.approachTitle, ui.approachCopy, true)}<div class="approach-grid">${approach.map(([number, icon, title, copy]) => `<article class="approach-card reveal"><div class="approach-card__top"><span class="approach-card__icon">${icon}</span><span>${number}</span></div><h3>${pick(title)}</h3><p>${pick(copy)}</p></article>`).join("")}</div></div></section>

      <section class="section categories" id="solutions"><div class="container">${heading(ui.categoryEyebrow, ui.categoryTitle, ui.categoryCopy)}<div class="category-grid">${categories.map(([number, category, title, productNames, copy]) => `<button type="button" class="category-card category-card--${category} reveal" data-filter="${category}" data-scroll="products"><span class="category-card__number">${number}</span><h3>${pick(title)}</h3><strong>${productNames}</strong><p>${pick(copy)}</p><span class="category-card__go">${pick(ui.viewProducts)}${arrow()}</span></button>`).join("")}</div></div></section>

      <section class="section product-section" id="products"><div class="container">${heading(ui.catalogEyebrow, ui.catalogTitle, ui.catalogCopy, true)}<div class="product-filters" role="tablist" aria-label="${locale === "en" ? "Product categories" : "ఉత్పత్తి వర్గాలు"}">${filters.map(([id, label]) => `<button type="button" data-filter="${id}" class="${filter === id ? "is-active" : ""}" role="tab" aria-selected="${filter === id}">${pick(label)}</button>`).join("")}</div>
        <div class="product-grid" aria-live="polite">${shownProducts.map(productCard).join("")}</div>${shownProducts.length ? "" : `<p class="empty-state">${pick(ui.noProducts)}</p>`}<p class="product-section__note">${pick(ui.policy)}</p></div></section>

      <section class="section crop-needs"><div class="container crop-needs-grid"><div class="crop-needs-copy reveal">${heading(ui.farmerEyebrow, ui.farmerTitle, ui.farmerCopy)}<div class="crop-needs-image" role="img" aria-label="${locale === "en" ? "Farmer examining crops" : "పంటలను పరిశీలిస్తున్న రైతు"}"></div></div><div class="need-grid">${needs.map(([number, icon, title, copy]) => `<article class="need-card reveal"><span class="need-card__number">${number}</span><span class="need-card__icon">${icon}</span><div><h3>${pick(title)}</h3><p>${pick(copy)}</p></div><i></i></article>`).join("")}</div></div></section>

      <section class="section why-section"><div class="container">${heading(ui.whyEyebrow, ui.whyTitle, ui.whyCopy)}<div class="why-grid">${why.map(([number, title, copy]) => `<article class="why-card reveal"><span>${number}</span><h3>${pick(title)}</h3><p>${pick(copy)}</p></article>`).join("")}</div></div></section>

      <section class="section testimonials" id="testimonials"><div class="container testimonial-layout">${heading(ui.testimonialEyebrow, ui.testimonialTitle)}<div class="testimonial-placeholder reveal"><span class="quote-mark">“</span><blockquote>${pick(ui.testimonialCopy)}</blockquote><p>${pick(ui.testimonialSmall)}</p><span class="testimonial-placeholder__line"></span></div></div></section>

      <section class="cta-section"><div class="cta-section__crop" aria-hidden="true"></div><div class="container cta-content"><p class="eyebrow eyebrow--light">${pick(ui.ctaEyebrow)}</p><h2>${pick(ui.ctaTitle)}</h2><p>${pick(ui.ctaCopy)}</p><div><button class="button button--gold" type="button" data-scroll="contact">${pick(ui.talk)}${arrow()}</button><button class="button button--ghost" type="button" data-scroll="products">${pick(ui.explore)}</button></div></div></section>

      <section class="section contact-section" id="contact"><div class="container">${heading(ui.contactEyebrow, ui.contactTitle, ui.contactCopy)}<div class="contact-grid">
        <div class="contact-details reveal"><div class="company-name">STEMGROW AGRI SOLUTIONS <span>PRIVATE LIMITED</span></div><address>${locale === "en" ? "H. No. 2-84/3/237/EP, Ground Floor,<br>Near Akshaya Enclave, Chinna Kranthi Colony,<br>Chengicherla, Peerzadiguda,<br>Hyderabad, Telangana, India, 500039" : "హెచ్. నెం. 2-84/3/237/EP, గ్రౌండ్ ఫ్లోర్,<br>అక్షయ ఎన్‌క్లేవ్ సమీపంలో, చిన్న క్రాంతి కాలనీ,<br>చెంగిచెర్ల, పీర్జాదిగూడ,<br>హైదరాబాద్, తెలంగాణ, భారతదేశం, 500039"}</address><div class="contact-links"><a href="tel:+919133243325"><span>◉</span>9133243325</a><a href="tel:+917981312887"><span>◉</span>7981312887</a><a href="mailto:stemgrowagrisolutions@gmail.com"><span>✉</span>stemgrowagrisolutions@gmail.com</a></div><div class="quick-actions"><a class="quick-action quick-action--whatsapp" href="https://wa.me/919133243325" target="_blank" rel="noreferrer">◌ WhatsApp</a><a class="quick-action" href="tel:+919133243325">⌕ ${pick(ui.call)}</a><a class="quick-action" href="mailto:stemgrowagrisolutions@gmail.com">✉ ${pick(ui.email)}</a></div></div>
        <div class="contact-form-wrap reveal"><form class="contact-form" id="contact-form" novalidate><div class="form-row"><label>${pick(ui.name)}<input name="name" autocomplete="name" required placeholder="${pick(ui.namePlaceholder)}"></label><label>${pick(ui.phone)}<input name="phone" inputmode="tel" autocomplete="tel" required pattern="[0-9+() -]{10,}" placeholder="+91"></label></div>${prefillProduct ? `<label class="product-prefill">${pick(ui.product)}<input name="product" value="${esc(prefillProduct)}" readonly aria-readonly="true"></label>` : ""}<div class="form-row"><label>${pick(ui.email)}<input name="email" type="email" autocomplete="email" required placeholder="${pick(ui.emailPlaceholder)}"></label><label>${pick(ui.crop)}<input name="crop" required placeholder="${pick(ui.cropPlaceholder)}"></label></div><label>${pick(ui.message)}<textarea name="message" rows="4" required placeholder="${pick(ui.messagePlaceholder)}"></textarea></label><p class="form-status ${formState === "error" ? "form-status--error" : formState === "success" ? "form-status--success" : ""}" role="status" aria-live="polite" ${formState === "idle" ? "hidden" : ""}>${formState === "error" ? pick(ui.formError) : formState === "success" ? pick(ui.formSuccess) : ""}</p><button class="button button--green" type="submit" ${formState === "loading" ? "disabled" : ""}>${formState === "loading" ? pick(ui.sending) : pick(ui.send)}${formState === "loading" ? "" : arrow()}</button></form></div>
      </div><div class="map-card reveal"><div class="map-card__head"><div><p class="eyebrow">${pick(ui.mapTitle)}</p><h3>Hyderabad, Telangana</h3></div><div class="map-card__actions"><a href="https://www.google.com/maps/search/?api=1&amp;query=H.+No.+2-84%2F3%2F237%2FEP%2C+Chengicherla%2C+Peerzadiguda%2C+Hyderabad%2C+Telangana+500039" target="_blank" rel="noreferrer">${pick(ui.viewMap)}</a><a href="https://www.google.com/maps/dir/?api=1&amp;destination=H.+No.+2-84%2F3%2F237%2FEP%2C+Chengicherla%2C+Peerzadiguda%2C+Hyderabad%2C+Telangana+500039" target="_blank" rel="noreferrer">${pick(ui.directions)}${arrow()}</a></div></div><iframe title="${pick(ui.mapTitle)}" loading="lazy" src="https://www.google.com/maps?q=H.%20No.%202-84%2F3%2F237%2FEP%2C%20Chengicherla%2C%20Peerzadiguda%2C%20Hyderabad%2C%20Telangana%20500039&amp;output=embed"></iframe></div></div></section>
    </main>

    <footer class="site-footer"><div class="container footer-grid"><div class="footer-brand">${logo(true)}<p>${pick(ui.footerCopy)}</p>${languageSwitcher()}</div><div><h3>${pick(ui.footerNav)}</h3><ul>${nav.map(([id, label]) => `<li><button type="button" data-scroll="${id}">${pick(label)}</button></li>`).join("")}</ul></div><div><h3>${pick(ui.footerProducts)}</h3><ul>${products.map((product) => `<li><button type="button" data-product="${product.id}">${product.name}</button></li>`).join("")}</ul></div><div><h3>${pick(ui.footerContact)}</h3><address>${locale === "en" ? "H. No. 2-84/3/237/EP, Ground Floor, Chengicherla, Peerzadiguda, Hyderabad, Telangana, India, 500039" : "హెచ్. నెం. 2-84/3/237/EP, గ్రౌండ్ ఫ్లోర్, చెంగిచెర్ల, పీర్జాదిగూడ, హైదరాబాద్, తెలంగాణ, భారతదేశం, 500039"}</address><a href="tel:+919133243325">9133243325</a><a href="mailto:stemgrowagrisolutions@gmail.com">stemgrowagrisolutions@gmail.com</a></div></div><div class="container footer-bottom"><span>${pick(ui.copyright)}</span><span>${pick(ui.policy)}</span></div></footer>
    <a class="whatsapp-float" href="https://wa.me/919133243325" target="_blank" rel="noreferrer" aria-label="${locale === "en" ? "Chat with Stemgrow on WhatsApp" : "వాట్సాప్‌లో స్టెమ్‌గ్రోతో మాట్లాడండి"}">◔<span>WhatsApp</span></a>
    ${productModal()}`;
  document.body.style.overflow = selectedProduct ? "hidden" : "";
  setHeaderState();
}

function setHeaderState() {
  const header = document.querySelector("#site-header");
  header?.classList.toggle("site-header--solid", window.scrollY > 20);
}

function refresh(keepScroll = true) {
  const position = window.scrollY;
  render();
  if (keepScroll) window.scrollTo({ top: position });
}

root.addEventListener("click", (event) => {
  const target = event.target.closest("button, a, [data-modal-backdrop]");
  if (!target) return;
  if (target.dataset.modalBackdrop !== undefined && event.target === target) { selectedProduct = null; refresh(); return; }
  if (target.dataset.closeModal !== undefined) { selectedProduct = null; refresh(); return; }
  if (target.dataset.lang) { locale = target.dataset.lang; refresh(); return; }
  if (target.dataset.filter) { filter = target.dataset.filter; refresh(); if (target.dataset.scroll) document.querySelector("#products")?.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
  if (target.dataset.enquireProduct) {
    const product = products.find((entry) => entry.id === target.dataset.enquireProduct);
    if (!product) return;
    prefillProduct = product.name;
    selectedProduct = null;
    formState = "idle";
    refresh(false);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => document.querySelector("#contact-form input[name='name']")?.focus(), 500);
    return;
  }
  if (target.dataset.product) { selectedProduct = target.dataset.product; refresh(); return; }
  if (target.dataset.menu !== undefined) { const navElement = document.querySelector(".desktop-nav"); const open = navElement.classList.toggle("is-open"); target.setAttribute("aria-expanded", String(open)); return; }
  if (target.dataset.scroll) { event.preventDefault(); document.querySelector(".desktop-nav")?.classList.remove("is-open"); document.querySelector("[data-menu]")?.setAttribute("aria-expanded", "false"); document.getElementById(target.dataset.scroll)?.scrollIntoView({ behavior: "smooth", block: "start" }); }
});

root.addEventListener("submit", (event) => {
  if (event.target.id !== "contact-form") return;
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  const name = String(data.get("name") ?? "").trim();
  const phone = String(data.get("phone") ?? "").trim();
  const crop = String(data.get("crop") ?? "").trim();
  const product = String(data.get("product") ?? prefillProduct).trim();
  const status = form.querySelector(".form-status");
  const phoneDigits = phone.replace(/\D/g, "");
  const localMobile = phoneDigits.length === 12 && phoneDigits.startsWith("91") ? phoneDigits.slice(2) : phoneDigits;
  if (!name || !crop || !/^[6-9]\d{9}$/.test(localMobile)) {
    formState = "error";
    status.hidden = false;
    status.className = "form-status form-status--error";
    status.textContent = pick(ui.formError);
    return;
  }
  const email = String(data.get("email") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!validEmail || !message) {
    formState = "error";
    status.hidden = false;
    status.className = "form-status form-status--error";
    status.textContent = pick(ui.formError);
    return;
  }
  const submitButton = form.querySelector("button[type='submit']");
  formState = "loading";
  status.hidden = true;
  submitButton.disabled = true;
  submitButton.textContent = pick(ui.sending);
  const body = `Product: ${product || "Not specified"}\nName: ${name}\nMobile: ${phone}\nEmail: ${email}\nCrop / Requirement: ${crop}\n\nMessage:\n${message}`;
  window.setTimeout(() => {
    formState = "success";
    status.hidden = false;
    status.className = "form-status form-status--success";
    status.textContent = pick(ui.formSuccess);
    submitButton.disabled = false;
    submitButton.innerHTML = `${pick(ui.send)}${arrow()}`;
    window.location.href = `mailto:stemgrowagrisolutions@gmail.com?subject=${encodeURIComponent(product ? `Website enquiry — ${product}` : "Website enquiry")}&body=${encodeURIComponent(body)}`;
  }, 420);
});

document.addEventListener("keydown", (event) => { if (event.key === "Escape" && selectedProduct) { selectedProduct = null; refresh(); } });
window.addEventListener("scroll", setHeaderState, { passive: true });
render();
