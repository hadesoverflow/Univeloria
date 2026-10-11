import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, ArrowLeft, Box, Palette, ShieldCheck, House, Sun, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import './style.css';

const collectionsData = [
  {
    id: "living",
    eyebrow: "LIVING ROOM",
    title: "Rèm phòng khách",
    subtitle: "Tạo nên không gian sang trọng và thoáng đãng.",
    image: "/assets/living-room.jpg",
    tags: ["Thanh lịch", "Thoáng sáng", "Hiện đại"],
  },
  {
    id: "bedroom",
    eyebrow: "BEDROOM",
    title: "Rèm phòng ngủ",
    subtitle: "Giấc ngủ trọn vẹn trong không gian yên bình.",
    image: "/assets/bedroom.jpg",
    tags: ["Cản sáng", "Ấm áp", "Riêng tư"],
  },
  {
    id: "dining",
    eyebrow: "DINING ROOM",
    title: "Rèm phòng ăn",
    subtitle: "Tinh tế trong từng khoảnh khắc sum họp.",
    image: "/assets/dining-room.jpg",
    tags: ["Tự nhiên", "Tinh giản", "Dễ phối"],
  },
  {
    id: "office",
    eyebrow: "WORKSPACE",
    title: "Rèm văn phòng",
    subtitle: "Tăng hiệu suất, nâng tầm không gian làm việc.",
    image: "/assets/office.jpg",
    tags: ["Chuyên nghiệp", "Điều tiết sáng", "Bền đẹp"],
  },
];

const collectionFilters = ["Tất cả", "Phòng khách", "Phòng ngủ", "Phòng ăn", "Văn phòng"];

const curtainTypes = [
  { id: "linen", name: "Rèm vải linen cao cấp", desc: "Thanh lịch · Phù hợp không gian hiện đại", colors: ["#e8dfd0", "#d7c2a5", "#a98a6b", "#c9c4b8", "#777a70"] },
  { id: "sheer", name: "Rèm voan mềm mại", desc: "Nhẹ nhàng · Tối ưu ánh sáng tự nhiên", colors: ["#f4eee4", "#e6d9c8", "#cbb79f", "#b9b6ae"] },
  { id: "double", name: "Rèm hai lớp sang trọng", desc: "Linh hoạt · Cản sáng tốt", colors: ["#eee2d1", "#cbb397", "#92745b", "#454c47"] },
  { id: "pattern", name: "Rèm linen họa tiết", desc: "Tạo điểm nhấn · Hợp phong cách cổ điển", colors: ["#d7c4a8", "#a99072", "#8d8375", "#6f716a"] },
];

const studioStyleFilters = ["Tất cả", "Hiện đại", "Tối giản", "Cổ điển"];

function StudioIcon({ name, size = 20 }) {
  const paths = {
    image: <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></>,
    sparkle: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z"/><path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z"/></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    cube: <><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 8 9 5 9-5"/><path d="M3 8v9l9 5 9-5V8"/><path d="M12 13v9"/></>,
    upload: <><path d="M12 16V4"/><path d="m7 9 5-5 5 5"/><path d="M4 16v4h16v-4"/></>,
    camera: <><path d="M14 4h-4L8 6H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-4l-2-2Z"/><circle cx="12" cy="13" r="3.5"/></>,
    rotate: <><path d="M20 7v5h-5"/><path d="M4 17v-5h5"/><path d="M5.6 9A7 7 0 0 1 18 6l2 6"/><path d="M18.4 15A7 7 0 0 1 6 18l-2-6"/></>,
    zoom: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5M10.5 7v7M7 10.5h7"/></>,
    expand: <><path d="M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    close: <><path d="m18 6-12 12M6 6l12 12"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

const productsData = [
  { id: 1, name: "Rèm vải linen cao cấp", code: "UVL-LN001", category: "Rèm vải", style: "Tự nhiên", colors: ["#e9d8c2","#c5a27d","#755039","#e8e4d9","#9c9b8c"], price: 2450000, oldPrice: null, rating: "4.9", reviews: 128, badge: "", image: "/assets/product-linen.jpg" },
  { id: 2, name: "Rèm vải nhung sang trọng", code: "UVL-VT002", category: "Rèm vải", style: "Sang trọng", colors: ["#d7b89a","#987354","#594133","#5c7893","#171b24"], price: 2890000, oldPrice: null, rating: "4.8", reviews: 96, badge: "", image: "/assets/product-velvet.jpg" },
  { id: 3, name: "Rèm voan mềm mại", code: "UVL-VO003", category: "Rèm voan", style: "Tối giản", colors: ["#f1ece5","#d5c0a7","#b59a80","#8c7968"], price: 1850000, oldPrice: null, rating: "4.9", reviews: 112, badge: "", image: "/assets/product-sheer.jpg" },
  { id: 4, name: "Rèm hai lớp cản sáng", code: "UVL-HL004", category: "Rèm hai lớp", style: "Hiện đại", colors: ["#ded4c7","#3a302a","#7b5638","#272b2a"], price: 3250000, oldPrice: null, rating: "4.9", reviews: 256, badge: "Bán chạy", image: "/assets/product-blackout.jpg" },
  { id: 5, name: "Rèm roman hiện đại", code: "UVL-RM005", category: "Rèm roman", style: "Hiện đại", colors: ["#f0e4d5","#d0b292","#987658","#77604b"], price: 2150000, oldPrice: null, rating: "4.7", reviews: 64, badge: "Mới", image: "/assets/product-roman.jpg" },
  { id: 6, name: "Rèm cuốn chống nắng", code: "UVL-CN006", category: "Rèm cuốn", style: "Tối giản", colors: ["#f1ece4","#c7aa8b","#a78a6d","#6b5b4b"], price: 1950000, oldPrice: 2250000, rating: "4.8", reviews: 91, badge: "Ưu đãi", image: "/assets/product-roller.jpg" },
  { id: 7, name: "Rèm văn phòng tối giản", code: "UVL-VP007", category: "Rèm vải", style: "Tối giản", colors: ["#e7ded1","#aaa49a","#686d69","#272b2a"], price: 2350000, oldPrice: null, rating: "4.6", reviews: 78, badge: "", image: "/assets/product-office.jpg" },
  { id: 8, name: "Rèm ngoài trời cao cấp", code: "UVL-NN008", category: "Rèm gỗ", style: "Sang trọng", colors: ["#d9c6a9","#a99071","#786149","#4b4c43"], price: 3850000, oldPrice: null, rating: "4.8", reviews: 83, badge: "", image: "/assets/product-outdoor.jpg" },
];

const productCategories = [
  { id: "Phòng khách", title: "Phòng khách", subtitle: "Sang trọng, tinh tế", image: "/assets/category-living.jpg" },
  { id: "Phòng ngủ", title: "Phòng ngủ", subtitle: "Êm ái, thư giãn", image: "/assets/category-bedroom.jpg" },
  { id: "Phòng ăn", title: "Phòng ăn", subtitle: "Ấm cúng, hiện đại", image: "/assets/category-dining.jpg" },
  { id: "Văn phòng", title: "Văn phòng", subtitle: "Chuyên nghiệp, tối giản", image: "/assets/category-office.jpg" },
  { id: "Ngoài trời", title: "Ngoài trời", subtitle: "Bền bỉ, chống nắng", image: "/assets/category-outdoor.jpg" },
];

const productCurtainTypes = [
  { name: "Rèm vải", count: 124 },
  { name: "Rèm voan", count: 68 },
  { name: "Rèm cuốn", count: 42 },
  { name: "Rèm gỗ", count: 26 },
  { name: "Rèm roman", count: 34 },
  { name: "Rèm hai lớp", count: 56 },
];

const productStyles = [
  { name: "Hiện đại", count: 98 },
  { name: "Tối giản", count: 66 },
  { name: "Cổ điển", count: 45 },
  { name: "Sang trọng", count: 72 },
  { name: "Tự nhiên", count: 38 },
];

const productPaletteColors = ["#f0dfc8","#d49a5b","#aa7c56","#cbb59e","#aaa69d","#8e8c82","#282b2d"];
const formatProductPrice = (price) => new Intl.NumberFormat("vi-VN").format(price) + "đ/m";

function ProductIcon({ name, size = 18 }) {
  const p = {
    search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>,
    cart: <><circle cx="9" cy="20" r="1"/><circle cx="19" cy="20" r="1"/><path d="M2 3h2l2.6 12.2a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6L22 7H5"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    chevron: <path d="m7 10 5 5 5-5"/>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    list: <><path d="M9 6h12M9 12h12M9 18h12"/><path d="M4 6h.01M4 12h.01M4 18h.01"/></>,
    close: <><path d="m18 6-12 12M6 6l12 12"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {p[name]}
    </svg>
  );
}

function ProductFilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="filter-section">
      <button className="filter-section-title" onClick={() => setOpen(!open)}>
        <strong>{title}</strong>
        <span className={open ? "chevron open" : "chevron"}>
          <ProductIcon name="chevron" size={15}/>
        </span>
      </button>
      {open && <div className="filter-section-body">{children}</div>}
    </section>
  );
}

const aboutValues = [
  { icon: "diamond", title: "Sứ mệnh", text: "Mang đến những giải pháp rèm cửa tinh tế, chất lượng và cá nhân hóa, giúp mọi không gian trở nên đẹp hơn, tiện nghi hơn và giàu cảm xúc hơn." },
  { icon: "eye", title: "Tầm nhìn", text: "Trở thành thương hiệu rèm cửa hàng đầu tại Việt Nam, dẫn đầu trong việc ứng dụng công nghệ AI và 3D vào thiết kế không gian sống." },
  { icon: "heart", title: "Giá trị cốt lõi", text: "Thẩm mỹ  |  Chất lượng  |  Sáng tạo\nKhách hàng là trung tâm  |  Phát triển bền vững" },
];

const aboutReasons = [
  { icon: "cube", title: "Thiết kế tinh tế, đa dạng phong cách", text: "Phù hợp với mọi không gian từ hiện đại đến cổ điển." },
  { icon: "chip", title: "Ứng dụng công nghệ AI 3D", text: "Giúp bạn xem trước và lựa chọn rèm một cách trực quan." },
  { icon: "badge", title: "Chất liệu cao cấp, bền bỉ", text: "Được tuyển chọn kỹ lưỡng, an toàn và thân thiện với môi trường." },
  { icon: "people", title: "Tư vấn tận tâm, đồng hành cùng bạn", text: "Từ ý tưởng đến hoàn thiện, UNIVELORIA luôn ở bên bạn." },
];

function AboutIcon({ name, size = 22 }) {
  const icons = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    diamond: <><path d="M6 3h12l4 6-10 12L2 9l4-6Z"/><path d="m2 9 20 0M6 3l6 18 6-18M6 3l-4 6M18 3l4 6"/></>,
    eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>,
    cube: <><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 8 9 5 9-5"/><path d="M3 8v9l9 5 9-5V8"/><path d="M12 13v9"/></>,
    chip: <><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 9h6v6H9zM9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4"/></>,
    badge: <><path d="M12 3 15 5l4 .5.5 4L22 13l-2 3.5-.5 4-4 .5-3 2-3-2-4-.5-.5-4L3 13l2.5-3.5.5-4L10 5l2-2Z"/><path d="m8 12 2.5 2.5L16 9"/></>,
    people: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

const showroomCards = [
  { title: "Không gian trưng bày", desc: "Đa dạng mẫu rèm, chất liệu cao cấp", image: "/assets/living-room.jpg" },
  { title: "Tư vấn 1:1 cùng chuyên gia", desc: "Đội ngũ giàu kinh nghiệm", image: "/assets/bedroom.jpg" },
  { title: "Trải nghiệm thực tế", desc: "Cảm nhận chất liệu và màu sắc", image: "/assets/dining-room.jpg" },
];

const contactFaqs = [
  { q: "Tôi có thể đặt lịch hẹn tư vấn tại showroom không?", a: "Có. Bạn có thể gửi biểu mẫu liên hệ để đội ngũ UNIVELORIA xác nhận thời gian phù hợp trước khi đến showroom." },
  { q: "UNIVELORIA có hỗ trợ thiết kế rèm theo yêu cầu không?", a: "Có. Chúng tôi hỗ trợ tư vấn theo kích thước, phong cách nội thất, nhu cầu cản sáng và ngân sách của từng không gian." },
  { q: "Thời gian thi công và lắp đặt là bao lâu?", a: "Thời gian phụ thuộc vào loại rèm, kích thước và địa điểm lắp đặt. Nhân viên sẽ trao đổi thời gian dự kiến sau khi tiếp nhận yêu cầu." },
  { q: "Chính sách bảo hành như thế nào?", a: "Chính sách bảo hành cụ thể sẽ được xác nhận theo từng dòng sản phẩm và điều kiện lắp đặt trong báo giá." },
];

function ContactIcon({ name, size = 20 }) {
  const icons = {
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path d="m18 6-12 12M6 6l12 12"/></>,
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z"/>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    check: <><path d="m5 12 4 4L19 6"/></>,
    sparkle: <><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="m19 16 .9 2.1L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9L19 16Z"/></>,
    external: <><path d="M14 3h7v7M10 14 21 3"/><path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

function ContactItem({ icon, title, children }) {
  return (
    <div className="contact-item">
      <div className="contact-icon"><ContactIcon name={icon} size={21}/></div>
      <div>
        <h3>{title}</h3>
        <div className="contact-detail">{children}</div>
      </div>
    </div>
  );
}

function UnifiedFooter({ navigateTo }) {
  return (
    <footer className="univeloria-unified-footer">
      <a
        href="#home"
        className="footer-brand-wrap"
        aria-label="UNIVELORIA - Thấu hiểu không gian, nâng tầm tổ ấm"
        onClick={(e) => {
          e.preventDefault();
          navigateTo('home');
        }}
      >
        <img src="/logo/logo.png" alt="UNIVELORIA Logo" className="footer-brand-logo" />
        <span className="brand-copy">
          <strong>UNIVELORIA<sup>®</sup></strong>
          <small>Thấu hiểu không gian, nâng tầm tổ ấm</small>
        </span>
      </a>
      <p>CURTAINS · SPACES · TECHNOLOGY</p>
      <button
        type="button"
        className="footer-contact-btn"
        onClick={() => navigateTo('contact')}
      >
        Kết nối cùng chúng tôi <ContactIcon name="arrow" size={15} />
      </button>
    </footer>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    if (window.location.hash === '#collections') return 'collections';
    if (window.location.hash === '#products') return 'products';
    if (window.location.hash === '#studio') return 'studio';
    if (window.location.hash === '#about') return 'about';
    if (window.location.hash === '#contact') return 'contact';
    return 'home';
  });

  // Home state
  const [activeColor, setActiveColor] = useState(0);
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Collections state
  const [activeCollectionFilter, setActiveCollectionFilter] = useState("Tất cả");
  const [savedCollections, setSavedCollections] = useState([]);

  // AI 3D Studio state
  const fileRef = useRef(null);
  const [roomImage, setRoomImage] = useState("/assets/studio-room.png");
  const [hasUploaded, setHasUploaded] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [activeType, setActiveType] = useState("linen");
  const [studioColor, setStudioColor] = useState("#d7c2a5");
  const [activeStudioFilter, setActiveStudioFilter] = useState("Tất cả");
  const [viewMode, setViewMode] = useState("3D");
  const [zoom, setZoom] = useState(1);
  const [fullScreen, setFullScreen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);

  const currentType = curtainTypes.find((t) => t.id === activeType) || curtainTypes[0];

  const visibleCollections = useMemo(() => {
    if (activeCollectionFilter === "Tất cả") return collectionsData;
    const map = {
      "Phòng khách": "living",
      "Phòng ngủ": "bedroom",
      "Phòng ăn": "dining",
      "Văn phòng": "office",
    };
    return collectionsData.filter((item) => item.id === map[activeCollectionFilter]);
  }, [activeCollectionFilter]);

  const toggleSavedCollection = (id) => {
    setSavedCollections((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  function loadFile(file) {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setRoomImage(url);
    setHasUploaded(true);
    setAnalyzed(false);
    setIsAnalyzing(false);
    setShowOriginal(false);
  }

  function analyzeRoom() {
    setIsAnalyzing(true);
    setAnalyzed(false);
    window.setTimeout(() => {
      setIsAnalyzing(false);
      setAnalyzed(true);
    }, 1400);
  }

  function chooseType(type) {
    setActiveType(type.id);
    setStudioColor(type.colors[Math.min(1, type.colors.length - 1)]);
  }

  // Products state
  const [selectedProductCategory, setSelectedProductCategory] = useState("Tất cả");
  const [selectedProductTypes, setSelectedProductTypes] = useState(["Rèm vải"]);
  const [selectedProductStyles, setSelectedProductStyles] = useState([]);
  const [selectedProductColors, setSelectedProductColors] = useState([]);
  const [maxProductPrice, setMaxProductPrice] = useState(10000000);
  const [productSortBy, setProductSortBy] = useState("popular");
  const [productFavorites, setProductFavorites] = useState([]);
  const [productCart, setProductCart] = useState([]);
  const [productSearchOpen, setProductSearchOpen] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const [productView, setProductView] = useState("grid");
  const [productNotice, setProductNotice] = useState("");
  const [activeCardColors, setActiveCardColors] = useState({});

  const filteredProducts = useMemo(() => {
    let result = productsData.filter((p) => {
      const typeOk = selectedProductTypes.length === 0 || selectedProductTypes.includes(p.category) || (selectedProductTypes.length === 1 && selectedProductTypes[0] === "Rèm vải");
      const styleOk = selectedProductStyles.length === 0 || selectedProductStyles.includes(p.style);
      const colorOk = selectedProductColors.length === 0 || p.colors.some((c) => selectedProductColors.includes(c));
      const priceOk = p.price <= maxProductPrice;
      const categoryOk = selectedProductCategory === "Tất cả" || (
        selectedProductCategory === "Phòng khách" ? ["Rèm vải", "Rèm voan", "Rèm hai lớp"].includes(p.category) :
        selectedProductCategory === "Phòng ngủ" ? ["Rèm vải", "Rèm voan", "Rèm roman", "Rèm hai lớp"].includes(p.category) :
        selectedProductCategory === "Phòng ăn" ? ["Rèm voan", "Rèm vải"].includes(p.category) :
        selectedProductCategory === "Văn phòng" ? ["Rèm cuốn", "Rèm roman", "Rèm vải"].includes(p.category) :
        ["Rèm gỗ", "Rèm cuốn"].includes(p.category)
      );
      const queryOk = `${p.name} ${p.code} ${p.category} ${p.style}`.toLowerCase().includes(productSearch.toLowerCase());
      return typeOk && styleOk && colorOk && priceOk && categoryOk && queryOk;
    });

    if (productSortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    if (productSortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    if (productSortBy === "rating") result.sort((a, b) => Number(b.rating) - Number(a.rating));
    if (productSortBy === "popular") result.sort((a, b) => b.reviews - a.reviews);
    return result;
  }, [selectedProductCategory, selectedProductTypes, selectedProductStyles, selectedProductColors, maxProductPrice, productSortBy, productSearch]);

  function toggleProductFilter(list, setList, value) {
    setList((current) => current.includes(value) ? current.filter((v) => v !== value) : [...current, value]);
  }

  function resetProductFilters() {
    setSelectedProductCategory("Tất cả");
    setSelectedProductTypes([]);
    setSelectedProductStyles([]);
    setSelectedProductColors([]);
    setMaxProductPrice(10000000);
    setProductSearch("");
  }

  function addToCart(product) {
    setProductCart((current) => [...current, product]);
    setProductNotice(`Đã thêm “${product.name}” vào giỏ hàng`);
    window.setTimeout(() => setProductNotice(""), 2500);
  }

  function toggleProductFavorite(id) {
    setProductFavorites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  // Contact state
  const [openContactFaq, setOpenContactFaq] = useState(-1);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", phone: "", email: "", need: "", space: "", budget: "", message: "", consent: false });
  const [contactErrors, setContactErrors] = useState({});
  const updateContact = (key, value) => setContactForm(current => ({ ...current, [key]: value }));

  function handleContactSubmit(e) {
    e.preventDefault();
    const next = {};
    if (!contactForm.name.trim()) next.name = "Vui lòng nhập họ và tên.";
    if (!contactForm.phone.trim()) next.phone = "Vui lòng nhập số điện thoại.";
    else if (!/^[+()\d\s.-]{8,20}$/.test(contactForm.phone.trim())) next.phone = "Số điện thoại chưa hợp lệ.";
    if (contactForm.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email.trim())) next.email = "Email chưa hợp lệ.";
    if (!contactForm.consent) next.consent = "Vui lòng đồng ý để chúng tôi liên hệ tư vấn.";
    setContactErrors(next);
    if (Object.keys(next).length === 0) setContactSubmitted(true);
  }

  const slides = [
    { id: 'home', name: 'Không gian sống' },
    { id: 'collections', name: 'Bộ sưu tập' },
    { id: 'products', name: 'Sản phẩm cao cấp' },
    { id: 'studio', name: 'Công nghệ AI 3D' },
    { id: 'about', name: 'Giới thiệu' },
    { id: 'contact', name: 'Liên hệ' }
  ];

  const colors = [
    { name: 'Ivory', hex: '#f3eee3' }, { name: 'Sand', hex: '#d6c2a8' },
    { name: 'Taupe', hex: '#a48b72' }, { name: 'Olive', hex: '#777a65' },
    { name: 'Slate', hex: '#49565a' }, { name: 'Black', hex: '#171b1c' }
  ];

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash === '#collections') setCurrentPage('collections');
      else if (hash === '#products') setCurrentPage('products');
      else if (hash === '#studio') setCurrentPage('studio');
      else if (hash === '#about') setCurrentPage('about');
      else if (hash === '#contact') setCurrentPage('contact');
      else setCurrentPage('home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Page entrance animations
  useEffect(() => {
    if (currentPage === 'home') {
      const ctx = gsap.context(() => {
        gsap.from('.hero-copy > *', { y: 24, opacity: 0, duration: 0.8, stagger: 0.12, delay: 0.2, ease: 'power3.out' });
        gsap.from('.preview-card', { y: 30, opacity: 0, duration: 0.8, delay: 0.65, ease: 'power3.out' });
        gsap.from('.hero-art', { scale: 0.96, opacity: 0, duration: 1.2, delay: 0.1, ease: 'power2.out' });
      });
      return () => ctx.revert();
    } else if (currentPage === 'collections') {
      const ctx = gsap.context(() => {
        gsap.from('.collections-hero .hero-copy > *', { y: 22, opacity: 0, duration: 0.8, stagger: 0.1, delay: 0.15, ease: 'power3.out' });
        gsap.from('.collection-card', { y: 28, opacity: 0, duration: 0.7, stagger: 0.08, delay: 0.35, ease: 'power3.out' });
      });
      return () => ctx.revert();
    } else if (currentPage === 'products') {
      const ctx = gsap.context(() => {
        gsap.from('.products-hero .hero-copy > *', { y: 22, opacity: 0, duration: 0.8, stagger: 0.1, delay: 0.15, ease: 'power3.out' });
        gsap.from('.category-card', { y: 20, opacity: 0, duration: 0.6, stagger: 0.06, delay: 0.25, ease: 'power3.out' });
        gsap.from('.filter-sidebar', { x: -20, opacity: 0, duration: 0.7, delay: 0.35, ease: 'power3.out' });
        gsap.from('.product-card', { y: 24, opacity: 0, duration: 0.7, stagger: 0.06, delay: 0.4, ease: 'power3.out' });
      });
      return () => ctx.revert();
    } else if (currentPage === 'studio') {
      const ctx = gsap.context(() => {
        gsap.from('.studio-intro .studio-intro-copy > *', { y: 22, opacity: 0, duration: 0.8, stagger: 0.1, delay: 0.15, ease: 'power3.out' });
        gsap.from('.stepper', { y: 20, opacity: 0, duration: 0.7, delay: 0.25, ease: 'power3.out' });
        gsap.from('.workspace > *', { y: 26, opacity: 0, duration: 0.75, stagger: 0.1, delay: 0.35, ease: 'power3.out' });
      });
      return () => ctx.revert();
    } else if (currentPage === 'about') {
      const ctx = gsap.context(() => {
        gsap.from('.about-hero .hero-copy > *', { y: 22, opacity: 0, duration: 0.8, stagger: 0.1, delay: 0.15, ease: 'power3.out' });
        gsap.from('.story-section', { y: 24, opacity: 0, duration: 0.7, delay: 0.3, ease: 'power3.out' });
        gsap.from('.value-card', { y: 20, opacity: 0, duration: 0.6, stagger: 0.08, delay: 0.4, ease: 'power3.out' });
        gsap.from('.why-section', { y: 24, opacity: 0, duration: 0.7, delay: 0.45, ease: 'power3.out' });
        gsap.from('.stats-section', { y: 20, opacity: 0, duration: 0.7, delay: 0.5, ease: 'power3.out' });
      });
      return () => ctx.revert();
    } else if (currentPage === 'contact') {
      const ctx = gsap.context(() => {
        gsap.from('.contact-page-view .hero-copy > *', { y: 22, opacity: 0, duration: 0.8, stagger: 0.1, delay: 0.15, ease: 'power3.out' });
        gsap.from('.contact-intro', { y: 24, opacity: 0, duration: 0.7, delay: 0.25, ease: 'power3.out' });
        gsap.from('.form-card', { y: 24, opacity: 0, duration: 0.7, delay: 0.35, ease: 'power3.out' });
        gsap.from('.showroom-section', { y: 24, opacity: 0, duration: 0.7, delay: 0.45, ease: 'power3.out' });
      });
      return () => ctx.revert();
    }
  }, [currentPage]);

  // Page navigation with luxury curtain transition
  const navigateTo = (targetPage, targetSection = null) => {
    if (currentPage === targetPage) {
      if (targetSection) {
        document.getElementById(targetSection)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const tl = gsap.timeline();

    tl.set('.page-transition-curtain-wrap', { pointerEvents: 'all' })
      .to('.page-transition-curtain', {
        scaleY: 1,
        duration: 0.45,
        ease: 'power3.inOut',
        transformOrigin: 'bottom',
      })
      .to('.curtain-brand-glow', {
        opacity: 1,
        scale: 1,
        duration: 0.22,
        ease: 'power2.out',
      }, '-=0.18')
      .call(() => {
        setCurrentPage(targetPage);
        window.history.pushState(null, '', targetPage === 'home' ? '#' : `#${targetPage}`);
        window.scrollTo(0, 0);
        if (targetSection) {
          setTimeout(() => {
            document.getElementById(targetSection)?.scrollIntoView({ behavior: 'smooth' });
          }, 80);
        }
      })
      .to('.curtain-brand-glow', {
        opacity: 0,
        scale: 0.9,
        duration: 0.2,
        delay: 0.08,
        ease: 'power2.in',
      })
      .to('.page-transition-curtain', {
        scaleY: 0,
        duration: 0.45,
        ease: 'power3.inOut',
        transformOrigin: 'top',
      })
      .set('.page-transition-curtain-wrap', { pointerEvents: 'none' });
  };

  const scrollTo = (id) => {
    if (id === 'collections') {
      navigateTo('collections');
      return;
    }
    if (id === 'products') {
      navigateTo('products');
      return;
    }
    if (id === 'studio') {
      navigateTo('studio');
      return;
    }
    if (id === 'about') {
      navigateTo('about');
      return;
    }
    if (id === 'contact') {
      navigateTo('contact');
      return;
    }
    if (currentPage !== 'home') {
      navigateTo('home', id);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="app-container">
      {/* Cinematic Luxury Curtain Transition */}
      <div className="page-transition-curtain-wrap" aria-hidden="true">
        <div className="page-transition-curtain" />
        <div className="curtain-brand-glow">
          <img src="/logo/logo.png" alt="UNIVELORIA" />
          <span className="curtain-brand-title">UNIVELORIA</span>
          <span className="curtain-brand-sub">KHÔNG GIAN SỐNG & BỘ SƯU TẬP CAO CẤP</span>
        </div>
      </div>

      {currentPage === 'home' && (
        /* ==================== HOME PAGE ==================== */
        <div className="home-page-view">
          <section className="hero" id="home">
            <div className="sky-glow" />
            <header className="topbar">
              <a
                href="#home"
                className="mini-brand"
                aria-label="UNIVELORIA - Thấu hiểu không gian, nâng tầm tổ ấm"
                onClick={(e) => { e.preventDefault(); scrollTo('home'); }}
              >
                <img src="/logo/logo.png" alt="UNIVELORIA Logo" className="brand-logo" />
                <span className="brand-text">
                  <span className="brand-name">UNIVELORIA<span className="reg">®</span></span>
                  <small>Thấu hiểu không gian, nâng tầm tổ ấm</small>
                </span>
              </a>
              <div className="topbar-actions">
                <nav className="nav">
                  <button className="active-nav-btn" onClick={() => navigateTo('home')}>Không Gian Sống</button>
                  <button onClick={() => navigateTo('collections')}>Bộ Sưu Tập</button>
                  <button onClick={() => navigateTo('products')}>Sản Phẩm</button>
                  <button onClick={() => navigateTo('studio')}>AI 3D Studio</button>
                  <button onClick={() => navigateTo('about')}>Giới Thiệu</button>
                  <button onClick={() => navigateTo('contact')}>Liên Hệ</button>
                </nav>
              </div>
            </header>

            <div className="hero-art-wrap">
              <img className="hero-art" src="/assets/hero-room.png" alt="Không gian cửa kính với rèm voan và rèm vải cao cấp" />
            </div>

            <div className="hero-panel">
              <div className="hero-copy">
                <p className="eyebrow">CURTAINS · SPACES · TECHNOLOGY</p>
                <h1>Beyond<br/>the Window.</h1>
                <p className="intro">Rèm cửa không chỉ che nắng,<br className="desktop-only"/> mà còn kiến tạo không gian sống của bạn.</p>
                <div className="hero-actions">
                  <button className="pill pill-dark" onClick={() => navigateTo('studio')}>
                    <span>Trải nghiệm AI 3D</span>
                    <ArrowRight size={17}/>
                  </button>
                  <button className="pill pill-light" onClick={() => navigateTo('collections')}>
                    <span>Khám phá bộ sưu tập</span>
                    <ArrowRight size={17}/>
                  </button>
                </div>
              </div>

              <div className="preview-card">
                <div className="preview-head">
                  <span>AI 3D Preview</span>
                  <button aria-label="Mở AI 3D Studio" onClick={() => navigateTo('studio')}>
                    <ArrowRight size={15}/>
                  </button>
                </div>
                <div className="preview-content">
                  <div className={`preview-room tint-${activeColor}`}>
                    <img src="/assets/window-scene.png" alt="Xem trước rèm trong căn phòng"/>
                  </div>
                  <div className="preview-swatch-column">
                    <div className="swatches">
                      {colors.map((c, i) => (
                        <button
                          key={c.name}
                          title={c.name}
                          aria-label={c.name}
                          className={activeColor === i ? 'swatch selected' : 'swatch'}
                          style={{ background: c.hex }}
                          onClick={() => setActiveColor(i)}
                        />
                      ))}
                    </div>
                    <div className="fabric-samples">
                      <img src="/assets/beige-drape.png" alt="Voan trắng" className="fabric-tint-light"/>
                      <img src="/assets/beige-drape.png" alt="Vải be"/>
                      <img src="/assets/beige-drape.png" alt="Vải nâu" className="fabric-tint-brown"/>
                      <img src="/assets/beige-drape.png" alt="Vải xám đen" className="fabric-tint-dark"/>
                    </div>
                  </div>
                </div>
                <button className="preview-link" onClick={() => navigateTo('studio')}>
                  <span>Thử phối màu</span>
                  <ArrowRight size={14}/>
                </button>
              </div>
            </div>

            <div className="hero-bottom-strip">
              <div className="hero-slide-tracker">
                <div className="slide-counter">
                  <strong>{`0${currentSlide + 1}`}</strong>
                  <span>/ {slides.length < 10 ? `0${slides.length}` : slides.length}</span>
                </div>
                <div className="slide-progress-track">
                  <div className="slide-progress-bar" style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }} />
                </div>
                <div className="slide-categories">
                  {slides.map((s, i) => (
                    <button
                      key={s.id}
                      className={currentSlide === i ? 'slide-category active' : 'slide-category'}
                      onClick={() => {
                        setCurrentSlide(i);
                        if (s.id === 'home') {
                          scrollTo('home');
                        } else {
                          navigateTo(s.id);
                        }
                      }}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="hero-nav-arrows">
                <button
                  className="nav-arrow nav-arrow-prev"
                  onClick={() => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length)}
                  aria-label="Slide trước"
                >
                  <ArrowLeft size={18}/>
                </button>
                <button
                  className="nav-arrow nav-arrow-next"
                  onClick={() => setCurrentSlide((p) => (p + 1) % slides.length)}
                  aria-label="Slide sau"
                >
                  <ArrowRight size={18}/>
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {currentPage === 'collections' && (
        /* ==================== COLLECTIONS PAGE ==================== */
        <div className="collections-page">
          <div className="ambient ambient-one" />
          <div className="ambient ambient-two" />

          {/* Dedicated Collections Header */}
          <header className="topbar topbar-collections">
            <a
              href="#home"
              className="mini-brand"
              aria-label="UNIVELORIA - Thấu hiểu không gian, nâng tầm tổ ấm"
              onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
            >
              <img src="/logo/logo.png" alt="UNIVELORIA Logo" className="brand-logo" />
              <span className="brand-text">
                <span className="brand-name">UNIVELORIA<span className="reg">®</span></span>
                <small>Thấu hiểu không gian, nâng tầm tổ ấm</small>
              </span>
            </a>
            <div className="topbar-actions">
              <nav className="nav">
                <button onClick={() => navigateTo('home')}>Không Gian Sống</button>
                <button className="active-nav-btn" onClick={() => navigateTo('collections')}>Bộ Sưu Tập</button>
                <button onClick={() => navigateTo('products')}>Sản Phẩm</button>
                <button onClick={() => navigateTo('studio')}>AI 3D Studio</button>
                <button onClick={() => navigateTo('about')}>Giới Thiệu</button>
                <button onClick={() => navigateTo('contact')}>Liên Hệ</button>
              </nav>
            </div>
          </header>

          {/* Collections Hero Banner */}
          <section className="collections-hero" id="top">
            <div className="hero-image" aria-hidden="true" />
            <div className="hero-wash" aria-hidden="true" />

            <div className="hero-copy">
              <div className="eyebrow"><span>BỘ SƯU TẬP</span><i /></div>
              <h1>Luxury Curtains<br /><em>for Every Space</em></h1>
              <p>
                Khám phá bộ sưu tập rèm cao cấp, được thiết kế<br className="desktop-break" />
                dành riêng cho từng không gian sống.
              </p>
              <div className="collections-banner-actions">
                <a className="pill-button dark-button" href="#collection-grid">
                  Khám phá tất cả <span className="arrow">↗</span>
                </a>
                <button className="pill-button light-button" onClick={() => navigateTo('home')}>
                  <span>← Về Không Gian Sống</span>
                </button>
              </div>
            </div>

            <div className="hero-note">
              <span className="note-mark">↘</span>
              <span>Không gian sống, theo cách của bạn.</span>
            </div>
          </section>

          {/* Collection Content (Toolbar + Filtered Grid) */}
          <section className="collection-content" id="collection-grid">
            <div className="collection-toolbar">
              <div className="filter-list" role="tablist" aria-label="Lọc bộ sưu tập">
                {collectionFilters.map((filter) => (
                  <button
                    key={filter}
                    role="tab"
                    aria-selected={activeCollectionFilter === filter}
                    className={`filter-chip ${activeCollectionFilter === filter ? "selected" : ""}`}
                    onClick={() => setActiveCollectionFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <div className="collection-count">
                <span>0{visibleCollections.length}</span> BỘ SƯU TẬP
              </div>
            </div>

            <div className={`collection-grid ${visibleCollections.length === 1 ? "single-result" : ""}`}>
              {visibleCollections.map((item, index) => (
                <article className="collection-card" key={item.id} style={{ "--delay": `${index * 80}ms` }}>
                  <div
                    className="card-image-link"
                    onClick={() => navigateTo('studio')}
                    style={{ cursor: 'pointer' }}
                    aria-label={`Khám phá ${item.title}`}
                  >
                    <img className="card-image" src={item.image} alt={item.title} />
                    <span className="card-index">0{collectionsData.findIndex((c) => c.id === item.id) + 1} / 04</span>
                    <button
                      className={`save-button ${savedCollections.includes(item.id) ? "saved" : ""}`}
                      aria-label={savedCollections.includes(item.id) ? "Bỏ lưu bộ sưu tập" : "Lưu bộ sưu tập"}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        toggleSavedCollection(item.id);
                      }}
                    >
                      {savedCollections.includes(item.id) ? "♥" : "♡"}
                    </button>
                    <span className="image-arrow">↗</span>
                  </div>
                  <div className="card-copy">
                    <div className="card-eyebrow">{item.eyebrow}</div>
                    <div className="card-title-row">
                      <h2>{item.title}</h2>
                      <button
                        className="round-arrow"
                        onClick={() => navigateTo('studio')}
                        aria-label={`Xem ${item.title}`}
                      >
                        ↗
                      </button>
                    </div>
                    <p>{item.subtitle}</p>
                    <div className="card-tags">
                      {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <UnifiedFooter navigateTo={navigateTo} />
        </div>
      )}

      {currentPage === 'products' && (
        /* ==================== PRODUCTS PAGE ==================== */
        <div className="products-page" id="top">
          {/* Products Topbar */}
          <header className="topbar topbar-products">
            <a
              href="#home"
              className="mini-brand"
              aria-label="UNIVELORIA - Thấu hiểu không gian, nâng tầm tổ ấm"
              onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
            >
              <img src="/logo/logo.png" alt="UNIVELORIA Logo" className="brand-logo" />
              <span className="brand-text">
                <span className="brand-name">UNIVELORIA<span className="reg">®</span></span>
                <small>Thấu hiểu không gian, nâng tầm tổ ấm</small>
              </span>
            </a>
            <div className="topbar-actions">
              <nav className="nav">
                <button onClick={() => navigateTo('home')}>Không Gian Sống</button>
                <button onClick={() => navigateTo('collections')}>Bộ Sưu Tập</button>
                <button className="active-nav-btn" onClick={() => navigateTo('products')}>Sản Phẩm</button>
                <button onClick={() => navigateTo('studio')}>AI 3D Studio</button>
                <button onClick={() => navigateTo('about')}>Giới Thiệu</button>
                <button onClick={() => navigateTo('contact')}>Liên Hệ</button>
              </nav>
            </div>
          </header>

          {/* Products Hero */}
          <section className="products-hero">
            <div className="hero-photo" />
            <div className="hero-fade" />
            <div className="hero-copy">
              <div className="eyebrow">SẢN PHẨM <span /></div>
              <h1>Rèm cao cấp<br />cho mọi không gian</h1>
              <p>
                Tinh tế trong từng chi tiết, mang đến sự hài hòa<br className="desktop-break" /> giữa thẩm mỹ và công năng cho ngôi nhà của bạn.
              </p>
            </div>
            <div className="hero-bottom-note"><span /> Được thiết kế cho cách bạn sống.</div>
          </section>

          {/* Category Strip */}
          <section className="category-strip" aria-label="Danh mục không gian">
            {productCategories.map((cat) => (
              <button
                key={cat.id}
                className={`category-card ${selectedProductCategory === cat.id ? 'chosen' : ''}`}
                onClick={() => setSelectedProductCategory(cat.id === selectedProductCategory ? 'Tất cả' : cat.id)}
              >
                <div className="category-card-img-wrap">
                  <img src={cat.image} alt={cat.title} />
                </div>
                <div className="category-card-bottom">
                  <span className="category-text">
                    <strong>{cat.title}</strong>
                    <small>{cat.subtitle}</small>
                  </span>
                  <span className="category-arrow">
                    <ProductIcon name="arrow" size={14} />
                  </span>
                </div>
              </button>
            ))}
          </section>

          {/* Catalog Layout */}
          <section className="catalog-layout">
            <aside className="filter-sidebar">
              <div className="filter-header">
                <h2>Bộ lọc sản phẩm</h2>
                <button onClick={resetProductFilters}>Đặt lại</button>
              </div>

              <ProductFilterSection title="Loại rèm">
                {productCurtainTypes.map((item) => (
                  <label className="check-row" key={item.name}>
                    <input
                      type="checkbox"
                      checked={selectedProductTypes.includes(item.name)}
                      onChange={() => toggleProductFilter(selectedProductTypes, setSelectedProductTypes, item.name)}
                    />
                    <span>{item.name}</span>
                    <small>({item.count})</small>
                  </label>
                ))}
              </ProductFilterSection>

              <ProductFilterSection title="Phong cách">
                {productStyles.map((item) => (
                  <label className="check-row" key={item.name}>
                    <input
                      type="checkbox"
                      checked={selectedProductStyles.includes(item.name)}
                      onChange={() => toggleProductFilter(selectedProductStyles, setSelectedProductStyles, item.name)}
                    />
                    <span>{item.name}</span>
                    <small>({item.count})</small>
                  </label>
                ))}
              </ProductFilterSection>

              <ProductFilterSection title="Màu sắc" defaultOpen={true}>
                <div className="filter-colors">
                  {productPaletteColors.map((color) => (
                    <button
                      key={color}
                      aria-label={`Lọc màu ${color}`}
                      className={selectedProductColors.includes(color) ? 'selected' : ''}
                      style={{ background: color }}
                      onClick={() => toggleProductFilter(selectedProductColors, setSelectedProductColors, color)}
                    />
                  ))}
                </div>
              </ProductFilterSection>

              <ProductFilterSection title="Khoảng giá">
                <input
                  className="price-range"
                  type="range"
                  min="500000"
                  max="10000000"
                  step="250000"
                  value={maxProductPrice}
                  onChange={(e) => setMaxProductPrice(Number(e.target.value))}
                />
                <div className="price-range-labels">
                  <span>500.000đ</span>
                  <span>{new Intl.NumberFormat('vi-VN').format(maxProductPrice)}đ</span>
                </div>
              </ProductFilterSection>
            </aside>

            <div className="catalog-main">
              <div className="catalog-toolbar">
                <div className="catalog-title-group">
                  <h2>
                    {selectedProductCategory === 'Tất cả' ? 'Tất cả sản phẩm' : selectedProductCategory}{' '}
                    <span className="product-count">(124)</span>
                  </h2>
                </div>
                <div className="toolbar-actions">
                  <label className="sort-select">
                    <span>Sắp xếp:</span>
                    <select value={productSortBy} onChange={(e) => setProductSortBy(e.target.value)}>
                      <option value="popular">Phổ biến nhất</option>
                      <option value="price-asc">Giá thấp đến cao</option>
                      <option value="price-desc">Giá cao đến thấp</option>
                      <option value="rating">Đánh giá cao</option>
                    </select>
                    <ProductIcon name="chevron" size={14} />
                  </label>
                  <button
                    className={`view-button ${productView === 'grid' ? 'selected' : ''}`}
                    aria-label="Dạng lưới"
                    onClick={() => setProductView('grid')}
                  >
                    <ProductIcon name="grid" size={16} />
                  </button>
                  <button
                    className={`view-button ${productView === 'list' ? 'selected' : ''}`}
                    aria-label="Dạng danh sách"
                    onClick={() => setProductView('list')}
                  >
                    <ProductIcon name="list" size={16} />
                  </button>
                </div>
              </div>

              <div className={`product-grid ${productView === 'list' ? 'list-view' : ''}`} id="product-grid">
                {filteredProducts.length === 0 && (
                  <div className="empty-state">
                    <ProductIcon name="search" size={28} />
                    <strong>Không tìm thấy sản phẩm phù hợp</strong>
                    <span>Thử thay đổi bộ lọc hoặc đặt lại điều kiện tìm kiếm.</span>
                    <button onClick={resetProductFilters}>Xóa bộ lọc</button>
                  </div>
                )}
                {filteredProducts.map((product) => (
                  <article className="product-card" key={product.id}>
                    <div className="product-image-wrap">
                      <img src={product.image} alt={product.name} className="product-image" />
                      {product.badge && (
                        <span className={`product-badge ${product.badge === 'Ưu đãi' ? 'sale' : product.badge === 'Mới' ? 'new' : ''}`}>
                          {product.badge}
                        </span>
                      )}
                      <button
                        className={`favorite-button ${productFavorites.includes(product.id) ? 'favorited' : ''}`}
                        aria-label="Yêu thích"
                        onClick={() => toggleProductFavorite(product.id)}
                      >
                        <ProductIcon name="heart" size={16} />
                      </button>
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <span className="product-code">{product.code}</span>
                      <div className="rating">
                        <span className="stars">★★★★★</span>
                        <span>{product.rating} ({product.reviews})</span>
                      </div>
                      <div className="product-colors">
                        {product.colors.map((color, colorIdx) => {
                          const isCurrent = (activeCardColors[product.id] ?? 0) === colorIdx;
                          return (
                            <button
                              key={color}
                              aria-label={`Màu ${color}`}
                              className={isCurrent ? 'active' : ''}
                              style={{ background: color }}
                              onClick={() => setActiveCardColors((prev) => ({ ...prev, [product.id]: colorIdx }))}
                            />
                          );
                        })}
                      </div>
                      <div className="product-pricing-row">
                        <div className="price-wrap">
                          <strong className="price">{formatProductPrice(product.price)}</strong>
                          {product.oldPrice && <small className="old-price">{formatProductPrice(product.oldPrice)}</small>}
                        </div>
                        <button
                          className="card-cart-btn"
                          aria-label="Thêm vào giỏ hàng"
                          onClick={() => addToCart(product)}
                        >
                          <ProductIcon name="cart" size={16} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <UnifiedFooter navigateTo={navigateTo} />

          {/* Toast Notification */}
          <div className={`toast ${productNotice ? 'visible' : ''}`} role="status">
            <ProductIcon name="check" size={16} /> {productNotice}
          </div>
        </div>
      )}

      {currentPage === 'studio' && (
        /* ==================== AI 3D STUDIO PAGE ==================== */
        <div className="studio-page">
          <div className="scene-backdrop" />

          {/* Studio Topbar */}
          <header className="topbar topbar-studio">
            <a
              href="#home"
              className="mini-brand"
              aria-label="UNIVELORIA - Thấu hiểu không gian, nâng tầm tổ ấm"
              onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
            >
              <img src="/logo/logo.png" alt="UNIVELORIA Logo" className="brand-logo" />
              <span className="brand-text">
                <span className="brand-name">UNIVELORIA<span className="reg">®</span></span>
                <small>Thấu hiểu không gian, nâng tầm tổ ấm</small>
              </span>
            </a>
            <div className="topbar-actions">
              <nav className="nav">
                <button onClick={() => navigateTo('home')}>Không Gian Sống</button>
                <button onClick={() => navigateTo('collections')}>Bộ Sưu Tập</button>
                <button onClick={() => navigateTo('products')}>Sản Phẩm</button>
                <button className="active-nav-btn" onClick={() => navigateTo('studio')}>AI 3D Studio</button>
                <button onClick={() => navigateTo('about')}>Giới Thiệu</button>
                <button onClick={() => navigateTo('contact')}>Liên Hệ</button>
              </nav>
            </div>
          </header>

          {/* Intro & Stepper */}
          <section className="studio-intro" id="top">
            <div className="studio-intro-copy">
              <div className="kicker">AI 3D STUDIO <span /></div>
              <h1>Biến không gian<br/>của bạn trở nên<br/><em>hoàn hảo</em></h1>
              <p>Chỉ cần một bức ảnh, AI sẽ phân tích không gian và gợi ý những mẫu rèm phù hợp, giúp bạn xem trước dưới dạng 3D trực quan.</p>
            </div>
            <div className="stepper" aria-label="Quy trình 4 bước">
              {[
                ["image", "1", "Tải ảnh"],
                ["sparkle", "2", "AI phân tích"],
                ["grid", "3", "Đề xuất rèm"],
                ["cube", "4", "Xem 3D & lựa chọn"],
              ].map(([icon, n, label], i) => (
                <React.Fragment key={n}>
                  <div className={`step ${i === 0 ? "step-active" : analyzed && i < 4 ? "step-done" : ""}`}>
                    <span className="step-icon"><StudioIcon name={icon} size={22}/></span>
                    <span className="step-text"><b>{n}</b><small>{label}</small></span>
                  </div>
                  {i < 3 && <span className="step-chevron">›</span>}
                </React.Fragment>
              ))}
            </div>
          </section>

          {/* Interactive Workspace (3 Panels) */}
          <section className="workspace" id="studio-workspace">
            {/* Panel 1: Upload */}
            <aside className="upload-panel glass-panel">
              <div className="panel-heading">
                <div>
                  <span className="panel-step">01 / YOUR SPACE</span>
                  <h2>Tải ảnh căn phòng của bạn</h2>
                </div>
                {hasUploaded && (
                  <button
                    className="icon-button"
                    onClick={() => { setRoomImage("/assets/studio-room.png"); setHasUploaded(false); setAnalyzed(false); }}
                    aria-label="Đặt lại ảnh"
                  >
                    <StudioIcon name="rotate" size={17}/>
                  </button>
                )}
              </div>
              <p className="panel-description">Chụp ảnh trực tiếp hoặc tải ảnh lên để AI phân tích không gian và gợi ý rèm phù hợp nhất.</p>
              
              <div
                className={`dropzone ${dragging ? "dragging" : ""}`}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => { e.preventDefault(); setDragging(false); loadFile(e.dataTransfer.files?.[0]); }}
              >
                <span className="upload-illustration"><StudioIcon name="image" size={34}/><i>+</i></span>
                <strong>Kéo thả ảnh vào đây</strong>
                <span className="or">Hoặc</span>
                <div className="upload-actions">
                  <button
                    className="button button-dark"
                    onClick={() => {
                      if (fileRef.current) {
                        fileRef.current.setAttribute("capture", "environment");
                        fileRef.current.click();
                      }
                    }}
                  >
                    <StudioIcon name="camera" size={17}/> Chụp ảnh
                  </button>
                  <button
                    className="button button-light"
                    onClick={() => {
                      if (fileRef.current) {
                        fileRef.current.removeAttribute("capture");
                        fileRef.current.click();
                      }
                    }}
                  >
                    <StudioIcon name="upload" size={17}/> Tải ảnh lên
                  </button>
                  <input
                    ref={fileRef}
                    className="hidden-input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => loadFile(e.target.files?.[0])}
                  />
                </div>
                <small>Hỗ trợ JPG, PNG, WEBP · Tối đa 20MB</small>
              </div>

              <div className="tips-title">Mẹo chụp ảnh đẹp hơn</div>
              <div className="tips-grid">
                <div>
                  <img src="/assets/tip-window.jpg" alt="Chụp toàn bộ cửa sổ"/>
                  <span><i><StudioIcon name="check" size={11}/></i>Chụp toàn bộ cửa sổ</span>
                </div>
                <div>
                  <img src="/assets/tip-light.jpg" alt="Đủ ánh sáng"/>
                  <span><i><StudioIcon name="check" size={11}/></i>Đủ ánh sáng</span>
                </div>
                <div>
                  <img src="/assets/tip-angle.jpg" alt="Góc chụp thẳng"/>
                  <span><i><StudioIcon name="check" size={11}/></i>Góc chụp thẳng</span>
                </div>
              </div>

              <button className="analyze-button" onClick={analyzeRoom} disabled={isAnalyzing}>
                {isAnalyzing ? (
                  <><span className="spinner"/> Đang phân tích không gian...</>
                ) : (
                  <><StudioIcon name="sparkle" size={17}/> {analyzed ? "Phân tích lại ảnh" : "Phân tích & gợi ý rèm"} <StudioIcon name="arrow" size={17}/></>
                )}
              </button>
              {analyzed && (
                <div className="analysis-note">
                  <StudioIcon name="check" size={15}/> Phân tích không gian hoàn tất. Hãy chọn mẫu rèm để xem trước.
                </div>
              )}
            </aside>

            {/* Panel 2: 3D Visualization */}
            <section className={`preview-panel glass-panel ${fullScreen ? "preview-fullscreen" : ""}`} aria-label="Kết quả mô phỏng">
              <div className="preview-header">
                <div>
                  <span className="panel-step">02 / VISUALIZATION</span>
                  <h2>{analyzed ? "Không gian đề xuất từ AI" : "Xem trước không gian"}</h2>
                </div>
                <span className={`status-pill ${analyzed ? "status-ready" : ""}`}>
                  <i/>{analyzed ? "Đã phân tích xong" : "Bản xem trước"}
                </span>
                <button className="icon-button" onClick={analyzeRoom} aria-label="Phân tích ảnh">
                  <StudioIcon name="rotate" size={17}/>
                </button>
              </div>

              <div className="room-stage">
                <img
                  className={`room-render ${showOriginal ? "show-original" : ""}`}
                  src={roomImage}
                  alt="Không gian xem trước"
                  style={{ transform: `scale(${zoom})` }}
                />
                <div className="stage-gradient"/>
                
                <div className="compare-switch">
                  <button className={showOriginal ? "selected" : ""} onClick={() => setShowOriginal(true)}>Ảnh gốc</button>
                  <button className={!showOriginal ? "selected" : ""} onClick={() => setShowOriginal(false)}>Xem rèm</button>
                </div>

                {!showOriginal && (
                  <div
                    className="curtain-tint"
                    style={{ "--fabric-color": studioColor, opacity: activeType === "sheer" ? 0.15 : 0.24 }}
                  />
                )}

                {isAnalyzing && (
                  <div className="analysis-overlay">
                    <span className="scan-line"/>
                    <div className="analysis-orb"><StudioIcon name="sparkle" size={26}/></div>
                    <strong>Đang phân tích căn phòng</strong>
                    <small>Nhận diện cửa sổ · ánh sáng · phong cách</small>
                  </div>
                )}

                <div className="stage-label">
                  <span className="live-dot"/>{viewMode} PREVIEW <span>·</span> {currentType.name}
                </div>
              </div>

              <div className="viewer-controls">
                <div className="mode-switch">
                  <button className={viewMode === "2D" ? "selected" : ""} onClick={() => setViewMode("2D")}>2D</button>
                  <button className={viewMode === "3D" ? "selected" : ""} onClick={() => setViewMode("3D")}>3D</button>
                </div>
                <span className="control-divider"/>
                <button onClick={() => setZoom(zoom >= 1.2 ? 1 : zoom + 0.1)}>
                  <StudioIcon name="rotate" size={17}/> Xoay
                </button>
                <button onClick={() => setZoom(zoom >= 1.3 ? 1 : zoom + 0.15)}>
                  <StudioIcon name="zoom" size={17}/> Phóng to
                </button>
                <button onClick={() => setFullScreen(!fullScreen)}>
                  <StudioIcon name="expand" size={16}/> {fullScreen ? "Thu nhỏ" : "Toàn màn hình"}
                </button>
              </div>
            </section>

            {/* Panel 3: AI Recommendations */}
            <aside className="recommend-panel glass-panel">
              <div className="recommend-heading">
                <div>
                  <span className="panel-step">03 / AI RECOMMENDATIONS</span>
                  <h2>Mẫu rèm phù hợp</h2>
                </div>
                <span className="recommend-count">04</span>
              </div>

              <div className="filter-tabs">
                {studioStyleFilters.map((filter) => (
                  <button
                    key={filter}
                    className={activeStudioFilter === filter ? "selected" : ""}
                    onClick={() => setActiveStudioFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="recommend-list">
                {curtainTypes
                  .filter((t) =>
                    activeStudioFilter === "Tất cả" ||
                    (activeStudioFilter === "Hiện đại"
                      ? ["linen", "double"].includes(t.id)
                      : activeStudioFilter === "Tối giản"
                      ? ["sheer", "linen"].includes(t.id)
                      : ["pattern", "double"].includes(t.id))
                  )
                  .map((type) => (
                    <button
                      className={`recommend-card ${activeType === type.id ? "active" : ""}`}
                      key={type.id}
                      onClick={() => chooseType(type)}
                    >
                      <span className={`fabric-thumb fabric-${type.id}`}>
                        <img src={roomImage} alt=""/>
                      </span>
                      <span className="recommend-info">
                        <strong>{type.name}</strong>
                        <small>{type.desc}</small>
                        <span className="mini-swatches">
                          {type.colors.slice(0, 5).map((c) => (
                            <i key={c} style={{ background: c }}/>
                          ))}
                        </span>
                      </span>
                      <span className="recommend-arrow"><StudioIcon name="arrow" size={16}/></span>
                    </button>
                  ))}
              </div>

              <div className="color-picker">
                <div className="subheading">
                  <strong>Màu sắc</strong>
                  <span>{studioColor.toUpperCase()}</span>
                </div>
                <div className="color-swatches">
                  {currentType.colors.map((color) => (
                    <button
                      key={color}
                      aria-label={`Chọn màu ${color}`}
                      className={studioColor === color ? "chosen" : ""}
                      style={{ background: color }}
                      onClick={() => setStudioColor(color)}
                    />
                  ))}
                </div>
              </div>

              <div className="selected-summary">
                <div>
                  <span>ĐANG CHỌN</span>
                  <strong>{currentType.name}</strong>
                </div>
                <button onClick={() => navigateTo('contact')}>
                  Tư vấn mẫu này <StudioIcon name="arrow" size={16}/>
                </button>
              </div>
            </aside>
          </section>

          <UnifiedFooter navigateTo={navigateTo} />
        </div>
      )}

      {currentPage === 'about' && (
        /* ==================== ABOUT US PAGE ==================== */
        <div className="about-page-view">
          {/* Topbar */}
          <header className="topbar topbar-about">
            <a
              href="#home"
              className="mini-brand"
              aria-label="UNIVELORIA - Thấu hiểu không gian, nâng tầm tổ ấm"
              onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
            >
              <img src="/logo/logo.png" alt="UNIVELORIA Logo" className="brand-logo" />
              <span className="brand-text">
                <span className="brand-name">UNIVELORIA<span className="reg">®</span></span>
                <small>Thấu hiểu không gian, nâng tầm tổ ấm</small>
              </span>
            </a>
            <div className="topbar-actions">
              <nav className="nav">
                <button onClick={() => navigateTo('home')}>Không Gian Sống</button>
                <button onClick={() => navigateTo('collections')}>Bộ Sưu Tập</button>
                <button onClick={() => navigateTo('products')}>Sản Phẩm</button>
                <button onClick={() => navigateTo('studio')}>AI 3D Studio</button>
                <button className="active-nav-btn" onClick={() => navigateTo('about')}>Giới Thiệu</button>
                <button onClick={() => navigateTo('contact')}>Liên Hệ</button>
              </nav>
            </div>
          </header>

          {/* Hero Section */}
          <section className="about-hero" id="top">
            <div className="about-hero-image" />
            <div className="about-hero-overlay" />
            <div className="hero-copy">
              <div className="eyebrow">ABOUT US <span /></div>
              <h1>Vẻ đẹp<br />bắt đầu từ<br />không gian sống</h1>
              <p>
                UNIVELORIA tin rằng mỗi ô cửa sổ đều có một câu chuyện,<br className="desktop" />
                và rèm cửa là cách để kể nên câu chuyện ấy – bằng ánh sáng,<br className="desktop" />
                chất liệu và cảm xúc.
              </p>
              <a
                className="dark-cta"
                href="#story"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('brand-story')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Câu chuyện của chúng tôi <AboutIcon name="arrow" size={16} />
              </a>
            </div>
            <div className="hero-caption"><span>01</span> / THE ART OF LIVING</div>
          </section>

          {/* Brand Story Section */}
          <section className="story-section" id="brand-story">
            <div className="story-image-wrap">
              <img src="/assets/about-story.jpg" alt="Rèm voan mềm mại trong ánh nắng hoàng hôn" />
              <div className="story-image-quote">
                A Beautiful<br />Space,<br />A Better You.
              </div>
            </div>
            <div className="story-copy">
              <div className="eyebrow">BRAND STORY <span /></div>
              <h2>Câu chuyện<br />thương hiệu</h2>
              <p>
                UNIVELORIA ra đời từ tình yêu dành cho những không gian sống đẹp và tinh tế.
                Chúng tôi tin rằng rèm cửa không chỉ là vật dụng che nắng, mà còn là một phần của phong cách sống – nơi thẩm mỹ, công năng và cảm xúc gặp nhau.
              </p>
              <p>
                Từ những ngày đầu, UNIVELORIA đã hướng đến việc mang các giải pháp rèm cửa hiện đại, chất lượng cao và phù hợp với từng không gian sống tại Việt Nam, kết hợp cùng công nghệ AI 3D để giúp khách hàng dễ dàng hình dung và lựa chọn sản phẩm phù hợp nhất.
              </p>
              <div className="side-note">
                <span>MORE</span><span>THAN</span><span>CURTAINS</span><i />
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="values-section">
            {aboutValues.map((v) => (
              <article className="value-card" key={v.title}>
                <div className="value-icon"><AboutIcon name={v.icon} size={23} /></div>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </article>
            ))}
          </section>

          {/* Why Section */}
          <section className="why-section">
            <div className="why-image">
              <img src="/assets/about-why.jpg" alt="Phòng khách cao cấp với rèm cửa màu kem" />
            </div>
            <div className="why-copy">
              <div className="eyebrow">WHY UNIVELORIA <span /></div>
              <h2>Vì sao lựa chọn<br />UNIVELORIA?</h2>
              <div className="reason-list">
                {aboutReasons.map((r) => (
                  <article className="reason" key={r.title}>
                    <div className="reason-icon"><AboutIcon name={r.icon} size={22} /></div>
                    <div>
                      <h3>{r.title}</h3>
                      <p>{r.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="stats-section">
            <div className="stats-bg">
              <img src="/assets/about-coast.jpg" alt="Ánh nắng hoàng hôn trên biển" />
            </div>
            <div className="stats-content">
              <div className="eyebrow">NHỮNG CON SỐ BIẾT NÓI <span /></div>
              <h2>Hành trình tạo nên<br />những không gian đẹp hơn</h2>
              <div className="stats-grid">
                <div>
                  <strong>10+</strong>
                  <span>Năm kinh nghiệm<br />trong ngành rèm cửa</span>
                </div>
                <div>
                  <strong>5.000+</strong>
                  <span>Khách hàng<br />tin tưởng lựa chọn</span>
                </div>
                <div>
                  <strong>500+</strong>
                  <span>Mẫu rèm đa dạng<br />và cập nhật liên tục</span>
                </div>
                <div>
                  <strong>100%</strong>
                  <span>Cam kết chất lượng<br />và dịch vụ tận tâm</span>
                </div>
              </div>
            </div>
          </section>

          <UnifiedFooter navigateTo={navigateTo} />
        </div>
      )}

      {currentPage === 'contact' && (
        /* ==================== CONTACT US PAGE ==================== */
        <div className="contact-page-view">
          {/* Hero Section */}
          <section className="contact-hero" id="top">
            <div className="contact-hero-photo" />
            <div className="contact-hero-overlay" />

            <header className="topbar topbar-contact">
              <a
                href="#home"
                className="mini-brand"
                aria-label="UNIVELORIA - Thấu hiểu không gian, nâng tầm tổ ấm"
                onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
              >
                <img src="/logo/logo.png" alt="UNIVELORIA Logo" className="brand-logo" />
                <span className="brand-text">
                  <span className="brand-name">UNIVELORIA<span className="reg">®</span></span>
                  <small>Thấu hiểu không gian, nâng tầm tổ ấm</small>
                </span>
              </a>
              <div className="topbar-actions">
                <nav className="nav">
                  <button onClick={() => navigateTo('home')}>Không Gian Sống</button>
                  <button onClick={() => navigateTo('collections')}>Bộ Sưu Tập</button>
                  <button onClick={() => navigateTo('products')}>Sản Phẩm</button>
                  <button onClick={() => navigateTo('studio')}>AI 3D Studio</button>
                  <button onClick={() => navigateTo('about')}>Giới Thiệu</button>
                  <button className="active-nav-btn" onClick={() => navigateTo('contact')}>Liên Hệ</button>
                </nav>
              </div>
            </header>

            <div className="hero-copy">
              <div className="eyebrow">CONTACT US <span /></div>
              <h1>Liên hệ<br />với chúng tôi</h1>
              <p>UNIVELORIA luôn sẵn sàng lắng nghe và đồng hành cùng bạn trong hành trình kiến tạo không gian sống đẹp hơn.</p>
            </div>
          </section>

          {/* Contact Section: Info + Consultation Form */}
          <section className="contact-section" id="contact">
            <div className="contact-intro">
              <div className="eyebrow">THÔNG TIN LIÊN HỆ <span /></div>
              <h2>Luôn đồng hành<br />cùng bạn</h2>
              <p>Dù bạn cần tư vấn chọn rèm, thiết kế theo yêu cầu hay trải nghiệm AI 3D, đội ngũ UNIVELORIA luôn sẵn sàng hỗ trợ.</p>
              <div className="contact-list">
                <ContactItem icon="pin" title="Địa chỉ showroom">
                  <span>123 Đường Hoa Phượng, Quận 7,</span>
                  <span>TP. Hồ Chí Minh, Việt Nam</span>
                </ContactItem>
                <ContactItem icon="phone" title="Số điện thoại">
                  <a href="tel:+842812345678">+84 28 1234 5678</a>
                  <a href="tel:+84901234567">+84 90 123 4567</a>
                </ContactItem>
                <ContactItem icon="mail" title="Email">
                  <a href="mailto:hello@univeloria.vn">hello@univeloria.vn</a>
                </ContactItem>
                <ContactItem icon="clock" title="Giờ làm việc">
                  <span>Thứ 2 - Thứ 7: 8:30 - 18:00</span>
                  <span>Chủ nhật: 9:00 - 17:00</span>
                </ContactItem>
              </div>
            </div>

            <div className="form-card">
              {!contactSubmitted ? (
                <>
                  <div className="eyebrow">GỬI YÊU CẦU TƯ VẤN <span /></div>
                  <h2>Để lại thông tin cho chúng tôi</h2>
                  <p className="form-intro">Chúng tôi sẽ liên hệ và tư vấn giải pháp rèm phù hợp nhất cho không gian của bạn.</p>
                  <form onSubmit={handleContactSubmit} noValidate>
                    <div className="form-grid">
                      <label>
                        Họ và tên *
                        <input
                          value={contactForm.name}
                          onChange={(e) => updateContact("name", e.target.value)}
                          placeholder="Nhập họ và tên"
                        />
                        {contactErrors.name && <small className="error">{contactErrors.name}</small>}
                      </label>
                      <label>
                        Số điện thoại *
                        <input
                          value={contactForm.phone}
                          onChange={(e) => updateContact("phone", e.target.value)}
                          placeholder="Nhập số điện thoại"
                          inputMode="tel"
                        />
                        {contactErrors.phone && <small className="error">{contactErrors.phone}</small>}
                      </label>
                      <label>
                        Email
                        <input
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => updateContact("email", e.target.value)}
                          placeholder="Nhập email của bạn"
                        />
                        {contactErrors.email && <small className="error">{contactErrors.email}</small>}
                      </label>
                      <label>
                        Nhu cầu
                        <select value={contactForm.need} onChange={(e) => updateContact("need", e.target.value)}>
                          <option value="">Chọn nhu cầu tư vấn</option>
                          <option>Tư vấn chọn rèm</option>
                          <option>Đặt lịch showroom</option>
                          <option>Thiết kế rèm theo yêu cầu</option>
                          <option>Hỗ trợ AI 3D Studio</option>
                          <option>Báo giá và lắp đặt</option>
                        </select>
                      </label>
                      <label>
                        Không gian sử dụng
                        <select value={contactForm.space} onChange={(e) => updateContact("space", e.target.value)}>
                          <option value="">Chọn không gian</option>
                          <option>Phòng khách</option>
                          <option>Phòng ngủ</option>
                          <option>Phòng ăn</option>
                          <option>Văn phòng</option>
                          <option>Khách sạn / dự án</option>
                          <option>Không gian ngoài trời</option>
                        </select>
                      </label>
                      <label>
                        Ngân sách dự kiến
                        <select value={contactForm.budget} onChange={(e) => updateContact("budget", e.target.value)}>
                          <option value="">Chọn khoảng ngân sách</option>
                          <option>Dưới 3 triệu</option>
                          <option>3 - 5 triệu</option>
                          <option>5 - 10 triệu</option>
                          <option>10 - 20 triệu</option>
                          <option>Trên 20 triệu</option>
                          <option>Cần tư vấn thêm</option>
                        </select>
                      </label>
                      <label className="full-width">
                        Nội dung yêu cầu
                        <textarea
                          value={contactForm.message}
                          onChange={(e) => updateContact("message", e.target.value)}
                          placeholder="Chia sẻ chi tiết nhu cầu của bạn..."
                          rows="3"
                        />
                      </label>
                    </div>
                    <label className="consent">
                      <input
                        type="checkbox"
                        checked={contactForm.consent}
                        onChange={(e) => updateContact("consent", e.target.checked)}
                      />
                      <span>Tôi đồng ý cho UNIVELORIA liên hệ để tư vấn.</span>
                    </label>
                    {contactErrors.consent && <small className="error consent-error">{contactErrors.consent}</small>}
                    <div className="form-bottom">
                      <span className="privacy-note">Thông tin của bạn được sử dụng để hỗ trợ yêu cầu tư vấn.</span>
                      <button type="submit" className="submit-btn">
                        Gửi yêu cầu tư vấn <ContactIcon name="arrow" size={16} />
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="success-state">
                  <div className="success-icon"><ContactIcon name="check" size={28} /></div>
                  <div className="eyebrow">ĐÃ TIẾP NHẬN THÔNG TIN <span /></div>
                  <h2>Cảm ơn bạn đã liên hệ!</h2>
                  <p>Yêu cầu của bạn đã được ghi nhận. Đội ngũ UNIVELORIA sẽ sớm liên hệ lại với bạn.</p>
                  <button
                    className="submit-btn"
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactForm({ name: "", phone: "", email: "", need: "", space: "", budget: "", message: "", consent: false });
                      setContactErrors({});
                    }}
                  >
                    Gửi yêu cầu khác <ContactIcon name="arrow" size={16} />
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Showroom & Interactive Vector Map Section */}
          <section className="showroom-section" id="showroom">
            <div className="showroom-heading">
              <div>
                <div className="eyebrow">SHOWROOM <span /></div>
                <h2>Trải nghiệm thực tế tại showroom</h2>
                <p>Trực tiếp cảm nhận chất liệu, màu sắc và các mẫu rèm cao cấp của UNIVELORIA với không gian trưng bày hiện đại và sang trọng.</p>
              </div>
            </div>
            <div className="showroom-layout">
              <div className="showroom-cards">
                {showroomCards.map((card) => (
                  <article className="showroom-card" key={card.title}>
                    <img src={card.image} alt={card.title} />
                    <div>
                      <h3>{card.title}</h3>
                      <p>{card.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
              <div className="map-card">
                <div className="map-art">
                  <div className="map-road road-one" />
                  <div className="map-road road-two" />
                  <div className="map-road road-three" />
                  <div className="map-green green-one" />
                  <div className="map-green green-two" />
                  <div className="map-label">Showroom UNIVELORIA</div>
                  <div className="map-pin"><ContactIcon name="pin" size={24} /></div>
                  <span className="map-caption">BẢN ĐỒ MINH HỌA</span>
                </div>
                <div className="map-bottom">
                  <div className="map-pin-small"><ContactIcon name="pin" size={18} /></div>
                  <div className="map-address">
                    <strong>UNIVELORIA Showroom</strong>
                    <span>123 Đường Hoa Phượng, Quận 7, TP. Hồ Chí Minh</span>
                  </div>
                  <a
                    className="directions"
                    href="https://maps.google.com/?q=Qu%E1%BA%ADn+7+TP+H%E1%BB%93+Ch%C3%AD+Minh"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Chỉ đường <ContactIcon name="arrow" size={14} />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* AI 3D Studio Banner */}
          <section className="ai-banner">
            <div className="ai-photo" />
            <div className="ai-overlay" />
            <div className="ai-copy">
              <div className="eyebrow">AI 3D STUDIO <span /></div>
              <h2>Thử rèm trong chính<br />không gian của bạn</h2>
              <p>Tải ảnh căn phòng, để AI 3D giúp bạn xem trước và lựa chọn mẫu rèm phù hợp nhất một cách trực quan.</p>
              <button onClick={() => navigateTo('studio')} className="ai-btn">
                Trải nghiệm AI 3D Studio <ContactIcon name="arrow" size={16} />
              </button>
            </div>
            <div className="ai-preview">
              <div className="preview-window">
                <img src="/assets/studio-room.png" alt="Xem trước không gian có rèm" />
              </div>
              <button onClick={() => navigateTo('studio')} className="preview-arrow" aria-label="Mở AI 3D Studio">
                <ContactIcon name="arrow" size={19} />
              </button>
              <span className="preview-tag">Xem trước với AI 3D</span>
            </div>
          </section>

          {/* FAQ Accordion Section */}
          <section className="faq-section">
            <div className="faq-heading">
              <div className="eyebrow">CÂU HỎI THƯỜNG GẶP <span /></div>
              <h2>Giải đáp nhanh<br />những thắc mắc</h2>
              <p>Chưa tìm thấy câu trả lời? Hãy gửi yêu cầu, chúng tôi sẵn sàng hỗ trợ.</p>
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Liên hệ tư vấn <ContactIcon name="arrow" size={15} />
              </a>
            </div>
            <div className="faq-list">
              {contactFaqs.map((faq, i) => (
                <article className={`faq-item ${openContactFaq === i ? "open" : ""}`} key={faq.q}>
                  <button onClick={() => setOpenContactFaq(openContactFaq === i ? -1 : i)} aria-expanded={openContactFaq === i}>
                    <span>{faq.q}</span>
                    <ContactIcon name="plus" size={17} />
                  </button>
                  {openContactFaq === i && <p>{faq.a}</p>}
                </article>
              ))}
            </div>
          </section>

          <UnifiedFooter navigateTo={navigateTo} />
        </div>
      )}
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App/>);
