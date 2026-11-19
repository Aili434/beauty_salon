import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Heart,
  Search,
  Scissors,
  Flower2,
  Smile,
  Shield,
  Activity,
  MapPin,
  Star,
  Calendar,
} from 'lucide-react';
import './App.css';

type CategoryId =
  | 'all'
  | 'hair'
  | 'relax'
  | 'nail'
  | 'eyelash'
  | 'ear'
  | 'massage'
  | 'acupuncture';

interface CategoryItem {
  id: CategoryId;
  label: string;
  icon: React.ReactNode;
}

interface Salon {
  id: string;
  category: Exclude<CategoryId, 'all'>;
  categoryLabel: string;
  name: string;
  rating: number;
  reviewCount: number;
  access: string;
  couponTitle: string;
  price: string;
  image: string;
  keywords: string[];
}

const CATEGORIES: CategoryItem[] = [
  { id: 'all', label: 'すべて', icon: <Sparkles size={20} /> },
  { id: 'hair', label: 'ヘアサロン', icon: <Scissors size={20} /> },
  { id: 'relax', label: 'リラク', icon: <Flower2 size={20} /> },
  { id: 'nail', label: 'ネイル', icon: <Sparkles size={20} /> },
  { id: 'eyelash', label: 'まつ毛', icon: <Smile size={20} /> },
  { id: 'ear', label: '耳つぼ', icon: <Shield size={20} /> },
  { id: 'massage', label: '整体', icon: <Activity size={20} /> },
  { id: 'acupuncture', label: '鍼灸院', icon: <Flower2 size={20} /> },
];

const SALONS: Salon[] = [
  {
    id: 'hair-1',
    category: 'hair',
    categoryLabel: 'ヘアサロン',
    name: 'Aura Hair & Spa 恵比寿',
    rating: 4.8,
    reviewCount: 142,
    access: '恵比寿駅西口より徒歩3分',
    couponTitle: '【人気No.1】小顔カット＋極上アロマヘッドスパ',
    price: '¥8,800',
    image:
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80',
    keywords: ['ヘアサロン', 'カット', 'ヘッドスパ', '恵比寿'],
  },
  {
    id: 'nail-1',
    category: 'nail',
    categoryLabel: 'ネイル',
    name: 'Atelier Fleur Nail 表参道',
    rating: 4.9,
    reviewCount: 98,
    access: '表参道駅A4出口より徒歩2分',
    couponTitle: '【季節限定】フラワーアート×ラメグラデーションジェル',
    price: '¥7,400',
    image: '/img/beauty_salon/1_.jpg',
    keywords: ['ネイル', 'ジェルネイル', 'フラワーアート', '表参道'],
  },
  {
    id: 'relax-1',
    category: 'relax',
    categoryLabel: 'リラク',
    name: 'Botanical Retreat Spa 青山',
    rating: 4.9,
    reviewCount: 116,
    access: '外苑前駅より徒歩4分',
    couponTitle: '【極上の癒し】アロマオイル全身トリートメント90分',
    price: '¥12,500',
    image: '/img/beauty_salon/6_.jpg',
    keywords: ['スパ', 'リラク', 'アロマ', 'トリートメント', '青山'],
  },
  {
    id: 'eyelash-1',
    category: 'eyelash',
    categoryLabel: 'まつ毛',
    name: 'Lash & Brow Salon Ciel 銀座',
    rating: 4.7,
    reviewCount: 84,
    access: '銀座駅C8出口より徒歩2分',
    couponTitle: '【束感・美カール】パリジェンヌまつ毛パーマ＋高濃度ケア',
    price: '¥5,900',
    image: '/img/beauty_salon/3_.jpg',
    keywords: ['まつ毛パーマ', 'まつ毛', 'パリジェンヌ', '銀座'],
  },
  {
    id: 'massage-1',
    category: 'massage',
    categoryLabel: '整体',
    name: '骨格・姿勢バランス整体院 渋谷',
    rating: 4.8,
    reviewCount: 129,
    access: '渋谷駅新南口より徒歩4分',
    couponTitle: '【首肩こり・骨盤矯正】オーダーメイド全身整体60分',
    price: '¥6,600',
    image: '/img/beauty_salon/2_.jpg',
    keywords: ['整体', 'マッサージ', '骨盤矯正', '肩こり', '渋谷'],
  },
  {
    id: 'ear-1',
    category: 'ear',
    categoryLabel: '耳つぼ',
    name: 'Ear Jewelry Salon Éclat 新宿',
    rating: 4.8,
    reviewCount: 63,
    access: '新宿三丁目駅より徒歩3分',
    couponTitle: '【リフトアップ＆自律神経ケア】耳つぼジュエリー10粒コース',
    price: '¥4,500',
    image: '/img/beauty_salon/4_.jpg',
    keywords: ['耳つぼジュエリー', '耳つぼ', 'ピアス', 'リフトアップ', '新宿'],
  },
  {
    id: 'acupuncture-1',
    category: 'acupuncture',
    categoryLabel: '鍼灸院',
    name: '和み美容鍼灸院 中目黒',
    rating: 4.9,
    reviewCount: 105,
    access: '中目黒駅より徒歩3分',
    couponTitle: '【深層ケア】全身経絡鍼治療＋自律神経調整60分',
    price: '¥8,200',
    image: '/img/beauty_salon/5_.jpg',
    keywords: ['鍼治療', '鍼灸院', '美容鍼', '肩こり', '中目黒'],
  },
];

export function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>(['nail-1', 'relax-1']);
  const [reservations, setReservations] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'search' | 'favorites' | 'bookings'>('search');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2400);
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleReservation = (salon: Salon) => {
    setReservations((prev) => {
      const exists = prev.includes(salon.id);
      if (exists) {
        showToast(`${salon.name} の予約をキャンセルしました`);
        return prev.filter((item) => item !== salon.id);
      } else {
        showToast(`${salon.name} を仮予約しました`);
        return [...prev, salon.id];
      }
    });
  };

  const filteredSalons = useMemo(() => {
    return SALONS.filter((salon) => {
      if (activeTab === 'favorites' && !favorites.includes(salon.id)) {
        return false;
      }
      if (activeTab === 'bookings' && !reservations.includes(salon.id)) {
        return false;
      }
      if (
        activeTab === 'search' &&
        selectedCategory !== 'all' &&
        salon.category !== selectedCategory
      ) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const match =
          salon.name.toLowerCase().includes(q) ||
          salon.couponTitle.toLowerCase().includes(q) ||
          salon.categoryLabel.toLowerCase().includes(q) ||
          salon.keywords.some((kw) => kw.toLowerCase().includes(q));
        if (!match) return false;
      }
      return true;
    });
  }, [activeTab, selectedCategory, searchQuery, favorites, reservations]);

  const sectionTitle =
    activeTab === 'favorites'
      ? 'お気に入りサロン'
      : activeTab === 'bookings'
      ? '予約済みプラン'
      : 'おすすめサロン・予約プラン';

  return (
    <div className="app-wrapper">
      {/* Header */}
      <header className="app-header">
        <div className="brand-group">
          <div className="brand-logo-box">
            <Sparkles size={22} />
          </div>
          <div>
            <h1 className="brand-title">Lumière</h1>
            <p className="brand-subtitle">BEAUTY &amp; RELAX SALON</p>
          </div>
        </div>
        <button
          type="button"
          className="header-fav-btn"
          aria-label="お気に入り一覧"
          onClick={() => setActiveTab('favorites')}
        >
          <Heart size={19} fill="#cf7a75" color="#cf7a75" />
          {favorites.length > 0 && <span className="fav-dot" />}
        </button>
      </header>

      {/* Search */}
      <div className="search-section">
        <div className="search-box">
          <Search size={18} color="#9c948e" />
          <input
            type="text"
            placeholder="サロン名、メニュー、こだわり条件で検索"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Filter */}
      {activeTab === 'search' && (
        <div className="category-grid">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                className={`category-card ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <div className="category-icon-wrap">{cat.icon}</div>
                <span className="category-label">{cat.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* List Header */}
      <div className="list-header">
        <div className="list-title">
          <Sparkles size={16} color="#cf7a75" />
          <span>{sectionTitle}</span>
        </div>
        <span className="list-count">{filteredSalons.length}件</span>
      </div>

      {/* Salon Cards */}
      <main className="salon-list">
        {filteredSalons.length === 0 ? (
          <div className="empty-state">
            該当するサロン・プランがありません。
          </div>
        ) : (
          filteredSalons.map((salon) => {
            const isFav = favorites.includes(salon.id);
            const isReserved = reservations.includes(salon.id);
            return (
              <article key={salon.id} className="salon-card">
                <div className="salon-image-wrap">
                  <img
                    src={salon.image}
                    alt={salon.name}
                    className="salon-image"
                    loading="lazy"
                  />
                  <span className="salon-badge">{salon.categoryLabel}</span>
                  <button
                    type="button"
                    className="card-fav-btn"
                    aria-label="お気に入りに追加"
                    onClick={() => toggleFavorite(salon.id)}
                  >
                    <Heart
                      size={18}
                      fill={isFav ? '#e04f5f' : 'none'}
                      color={isFav ? '#e04f5f' : '#7a736e'}
                    />
                  </button>
                </div>

                <div className="salon-body">
                  <div className="salon-title-row">
                    <h2 className="salon-name">{salon.name}</h2>
                    <div className="salon-rating">
                      <Star size={14} fill="#e6a955" color="#e6a955" />
                      {salon.rating.toFixed(1)}
                      <span>({salon.reviewCount})</span>
                    </div>
                  </div>

                  <p className="salon-access">
                    <MapPin size={13} />
                    <span>{salon.access}</span>
                  </p>

                  <div className="coupon-box">
                    <span className="coupon-title">{salon.couponTitle}</span>
                    <span className="coupon-price">{salon.price}</span>
                  </div>

                  <button
                    type="button"
                    className={`reserve-btn ${isReserved ? 'reserved' : ''}`}
                    onClick={() => toggleReservation(salon)}
                  >
                    {isReserved ? '予約済み（タップで取消）' : 'このプランで予約する'}
                  </button>
                </div>
              </article>
            );
          })
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button
          type="button"
          className={`nav-item ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          <Search size={20} />
          <span>さがす</span>
        </button>

        <button
          type="button"
          className={`nav-item ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          <Heart size={20} />
          <div className="nav-label-row">
            <span>お気に入り</span>
            {favorites.length > 0 && (
              <span className="nav-badge">{favorites.length}</span>
            )}
          </div>
        </button>

        <button
          type="button"
          className={`nav-item ${activeTab === 'bookings' ? 'active' : ''}`}
          onClick={() => setActiveTab('bookings')}
        >
          <Calendar size={20} />
          <div className="nav-label-row">
            <span>予約確認</span>
            {reservations.length > 0 && (
              <span className="nav-badge">{reservations.length}</span>
            )}
          </div>
        </button>
      </nav>

      {toastMessage && <div className="toast">{toastMessage}</div>}
    </div>
  );
}

export default App;