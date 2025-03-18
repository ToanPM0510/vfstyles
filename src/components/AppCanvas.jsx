import React, { useRef, useEffect, useState } from 'react';
import { JEELIZVTOWIDGET } from 'jeelizvtowidget';
import searchImage from '../assets/462638079_541639745119771_352923006521251447_n.png';

// Constants for glass categories
const GLASS_CATEGORIES = {
  FRAME: {
    GOLD: 'gold',
    BLACK: 'black',
    HAVANA: 'havana',
    SILVER: 'silver',
    WHITE: 'white',
    BLUE: 'blue',
    GRAY: 'gray',
    BRONZE: 'bronze',
    TRANSPARENT: 'transparent',
    BROWN: 'brown',
    PINK: 'pink',
    RED: 'red',
    CYAN: 'cyan',
    MATTE_BLACK: 'matte_black',
    GUN: 'gun'
  },
  LENS: {
    GREEN: 'green',
    GRAY: 'gray',
    BROWN: 'brown',
    BLUE: 'blue',
    FLASH: 'flash',
    GRADIENT: 'gradient',
    SILVER: 'silver',
    ORANGE: 'orange',
    PINK: 'pink',
    RED: 'red',
    YELLOW: 'yellow',
    PURPLE: 'purple',
    CLEAR: 'clear',
    MIRROR: 'mirror'
  },
  TYPE: {
    AVIATOR: 'aviator',
    WAYFARER: 'wayfarer',
    CLUBMASTER: 'clubmaster',
    CAT_EYE: 'cat_eye',
    STEAMPUNK: 'steampunk',
    SQUARE: 'square',
    ROUND: 'round',
    HEXAGONAL: 'hexagonal',
    THUG_LIFE: 'thug_life',
    SPORT: 'sport'
  }
};

function AppCanvas() {
  // Refs for canvas elements
  const refPlaceHolder = useRef();
  const refCanvas = useRef();
  const refPlaceHolder2 = useRef();
  const refCanvas2 = useRef();

  // State management
  const [currentModel, setCurrentModel] = useState('rayban_clubmaster_noir_bleuGris');
  const [isAdjustMode, setIsAdjustMode] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [filters, setFilters] = useState({
    frame: '',
    lens: '',
    type: ''
  });
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparedGlasses, setComparedGlasses] = useState([]);
  const [activeCanvas, setActiveCanvas] = useState('left');
  const maxClicks = 2;

  // Updated glasses data structure with categories
  const glassesModels = [
  {
    id: '1',
    sku: 'rayban_aviator_or_vertFlash',
    name: 'Ray Ban RB3025 Aviator Gold/Green',
    price: '₫290.000',
    details: 'Kính phi công cổ điển, gọng vàng, tròng xanh flash',
    categories: {
      frame: GLASS_CATEGORIES.FRAME.GOLD,
      lens: GLASS_CATEGORIES.LENS.FLASH,
      type: GLASS_CATEGORIES.TYPE.AVIATOR
    }
  },
  {
    id: '2',
    sku: 'carrera_5029_havana_blue_1',
    name: 'Carrera 5029NS Gold Grey T4E 9O',
    price: '₫350.000',
    details: 'Kính gọng havana, tròng xanh xám',
    categories: {
      frame: GLASS_CATEGORIES.FRAME.HAVANA,
      lens: GLASS_CATEGORIES.LENS.BLUE,
      type: GLASS_CATEGORIES.TYPE.SQUARE
    }
  },
  {
    id: '3',
    sku: 'carrera_113S_gold_brown_gradient',
    name: 'Carrera 113/S Gold Brown 029Q D8',
    price: '₫380.000',
    details: 'Kính gọng vàng, tròng nâu gradient',
    categories: {
      frame: GLASS_CATEGORIES.FRAME.GOLD,
      lens: GLASS_CATEGORIES.LENS.GRADIENT,
      type: GLASS_CATEGORIES.TYPE.SQUARE
    }
  },
  {
    id: '4',
    sku: 'carrera_119S_black_gray',
    name: 'Carrera 119/S Black Grey GTN/P9',
    price: '₫320.000',
    details: 'Kính gọng đen, tròng xám',
    categories: {
      frame: GLASS_CATEGORIES.FRAME.BLACK,
      lens: GLASS_CATEGORIES.LENS.GRAY,
      type: GLASS_CATEGORIES.TYPE.SQUARE
    }
  },
  {
    id: '5',
    sku: 'carrera_116s_black_brown',
    name: 'Carrera 116/S Black Brown 003 70',
    price: '₫340.000',
    details: 'Kính gọng đen, tròng nâu',
    categories: {
      frame: GLASS_CATEGORIES.FRAME.BLACK,
      lens: GLASS_CATEGORIES.LENS.BROWN,
      type: GLASS_CATEGORIES.TYPE.SQUARE
    }
  },
  {
    id: '6',
    sku: 'carrera_5003_gray_gray_gradient',
    name: 'Carrera 5003 Grey DDL JJ',
    price: '₫300.000',
    details: 'Kính gọng xám, tròng xám gradient',
    categories: {
      frame: GLASS_CATEGORIES.FRAME.GRAY,
      lens: GLASS_CATEGORIES.LENS.GRADIENT,
      type: GLASS_CATEGORIES.TYPE.SQUARE
    }
  },
  {
    id: '7',
    sku: 'carrera_5029_havana_blue',
    name: 'Carrera 5029NS Havana Blue RFE 9A',
    price: '₫350.000',
    details: 'Kính gọng havana, tròng xanh',
    categories: {
      frame: GLASS_CATEGORIES.FRAME.HAVANA,
      lens: GLASS_CATEGORIES.LENS.BLUE,
      type: GLASS_CATEGORIES.TYPE.SQUARE
    }
  },
  {
    id: '8',
    sku: 'carrera_114S_black_gray_gradient',
    name: 'Carrera 114/S Black Grey 003 HD',
    price: '₫330.000',
    details: 'Kính gọng đen, tròng xám gradient',
    categories: {
      frame: GLASS_CATEGORIES.FRAME.BLACK,
      lens: GLASS_CATEGORIES.LENS.GRADIENT,
      type: GLASS_CATEGORIES.TYPE.SQUARE
    }
  },
  {
    id: '9',
    sku: 'carrera_119S_havana_brown',
    name: 'Carrera 119/S Havana Brown L2L/NR',
    price: '₫340.000',
    details: 'Kính gọng havana, tròng nâu',
    categories: {
      frame: GLASS_CATEGORIES.FRAME.HAVANA,
      lens: GLASS_CATEGORIES.LENS.BROWN,
      type: GLASS_CATEGORIES.TYPE.SQUARE
    }
  },
  {
    id: '10',
    sku: 'carrera_116s_blue_gray',
    name: 'Carrera 116/S Blue Grey D6K P9',
    price: '₫320.000',
    details: 'Kính gọng xanh, tròng xám',
    categories: {
      frame: GLASS_CATEGORIES.FRAME.BLUE,
      lens: GLASS_CATEGORIES.LENS.GRAY,
      type: GLASS_CATEGORIES.TYPE.SQUARE
    }
  },
  {
    id: '11',
    sku: 'carrera_5003_bleu_gris_flash',
    name: 'Carrera 5003 Blue Grey DDN/9Y',
    price: '₫310.000',
    details: 'Kính gọng xanh, tròng xám flash',
    categories: {
      frame: GLASS_CATEGORIES.FRAME.BLUE,
      lens: GLASS_CATEGORIES.LENS.FLASH,
      type: GLASS_CATEGORIES.TYPE.SQUARE
    }
  },
  {
    id: '12',
    sku: 'carrera_6008_havane_green',
    name: 'Carrera 6008 Havana Green 100 DJ',
    price: '₫360.000',
    details: 'Kính gọng havana, tròng xanh lá',
    categories: {
      frame: GLASS_CATEGORIES.FRAME.HAVANA,
      lens: GLASS_CATEGORIES.LENS.GREEN,
      type: GLASS_CATEGORIES.TYPE.SQUARE
    }
  },
  {
    id: '13',
    sku: 'frogskins_black_brown',
    name: 'Oakley Frogskins Black Brown 9013',
    price: '₫400.000',
    details: 'Kính gọng đen, tròng nâu',
    categories: {
      frame: GLASS_CATEGORIES.FRAME.BLACK,
      lens: GLASS_CATEGORIES.LENS.BROWN,
      type: GLASS_CATEGORIES.TYPE.SPORT
    }
  },
  {
    id: '14',
    sku: 'flak_black_blue',
    name: 'Oakley Flak Black Blue 9188',
    price: '₫420.000',
    details: 'Kính gọng đen, tròng xanh',
    categories: {
      frame: GLASS_CATEGORIES.FRAME.BLACK,
      lens: GLASS_CATEGORIES.LENS.BLUE,
      type: GLASS_CATEGORIES.TYPE.SPORT
    }
  },
  {
    id: '15',
    sku: 'flak_white_blue',
    name: 'Oakley Flak White Blue 918820',
    price: '₫430.000',
    details: 'Kính gọng trắng, tròng xanh',
    categories: {
      frame: GLASS_CATEGORIES.FRAME.WHITE,
      lens: GLASS_CATEGORIES.LENS.BLUE,
      type: GLASS_CATEGORIES.TYPE.SPORT
    }
  },
  {
    id: '16',
    sku: 'latch_havana_green',
    name: 'Oakley Latch Havana Green 9265',
    price: '₫410.000',
    details: 'Kính gọng havana, tròng xanh lá',
    categories: {
      frame: GLASS_CATEGORIES.FRAME.HAVANA,
      lens: GLASS_CATEGORIES.LENS.GREEN,
      type: GLASS_CATEGORIES.TYPE.SQUARE
    }
  },
  {
    id: '17',
    sku: 'frogskins_black_gray',
    name: 'Oakley Frogskins Black Grey 9245-01',
    price: '₫390.000',
    details: 'Kính gọng đen, tròng xám',
    categories: {
      frame: GLASS_CATEGORIES.FRAME.BLACK,
      lens: GLASS_CATEGORIES.LENS.GRAY,
      type: GLASS_CATEGORIES.TYPE.SPORT
    }
  },
  {
    id: '18',
    sku: 'flak_white_orange',
    name: 'Oakley Flak White Orange 9188',
    price: '₫430.000',
    details: 'Kính gọng trắng, tròng cam',
    categories: {
      frame: GLASS_CATEGORIES.FRAME.WHITE,
      lens: GLASS_CATEGORIES.LENS.ORANGE,
      type: GLASS_CATEGORIES.TYPE.SPORT
    }
  },
  {
    id: '19',
    sku: 'frogskins_transparent_blue',
    name: 'Oakley Frogskins Transparent Blue 9013',
    price: '₫400.000',
    details: 'Kính gọng trong suốt, tròng xanh',
    categories: {
      frame: GLASS_CATEGORIES.FRAME.TRANSPARENT,
      lens: GLASS_CATEGORIES.LENS.BLUE,
      type: GLASS_CATEGORIES.TYPE.SPORT
    }
  },
  {
    id: '20',
    sku: 'flak_black_gray',
    name: 'Oakley Flak Black Grey 9188',
    price: '₫420.000',
    details: 'Kính gọng đen, tròng xám',
    categories: {
      frame: GLASS_CATEGORIES.FRAME.BLACK,
      lens: GLASS_CATEGORIES.LENS.GRAY,
      type: GLASS_CATEGORIES.TYPE.SPORT
    }
  },
  // Tiếp tục thêm các mẫu kính khác theo cách tương tự...
];

// Ví dụ thêm một số mẫu khác
[
  {
    id: '21',
    sku: 'aliexpress_cateye01_black_red',
    name: 'Cat Eye Style (Black & Red)',
    price: '₫250.000',
    details: 'Kính mắt mèo gọng đen, tròng đỏ',
    categories: {
      frame: GLASS_CATEGORIES.FRAME.BLACK,
      lens: GLASS_CATEGORIES.LENS.RED,
      type: GLASS_CATEGORIES.TYPE.CAT_EYE
    }
  },
  {
    id: '22',
    sku: 'aliexpress_steampunk_gold_blue_mirror',
    name: 'Steampunk (Gold & Blue)',
    price: '₫280.000',
    details: 'Kính steampunk gọng vàng, tròng xanh gương',
    categories: {
      frame: GLASS_CATEGORIES.FRAME.GOLD,
      lens: GLASS_CATEGORIES.LENS.MIRROR,
      type: GLASS_CATEGORIES.TYPE.STEAMPUNK
    }
  },
  {
    id: '23',
    sku: 'persol_PO0649_havana_green',
    name: 'Persol Havana Green 0649',
    price: '₫450.000',
    details: 'Kính gọng havana, tròng xanh lá',
    categories: {
      frame: GLASS_CATEGORIES.FRAME.HAVANA,
      lens: GLASS_CATEGORIES.LENS.GREEN,
      type: GLASS_CATEGORIES.TYPE.AVIATOR
    }
  }
];

  // Initialize widgets
  const init_VTOWidget = (placeHolder, canvas, isSecondary = false) => {
    JEELIZVTOWIDGET.start({
      placeHolder,
      canvas,
      callbacks: {
        ADJUST_START: () => setIsAdjustMode(true),
        ADJUST_END: () => setIsAdjustMode(false),
        LOADING_START: () => document.querySelector('.loading-overlay').style.display = 'block',
        LOADING_END: () => document.querySelector('.loading-overlay').style.display = 'none',
      },
      sku: isSecondary ? comparedGlasses[1]?.sku : currentModel,
      searchImageMask: searchImage,
      searchImageColor: 0xeeeeee,
      searchImageRotationSpeed: -0.001,
    });
  };

  // Widget control functions
  const enter_adjustMode = () => JEELIZVTOWIDGET.enter_adjustMode();
  const exit_adjustMode = () => JEELIZVTOWIDGET.exit_adjustMode();
  
  const set_glassesModel = (sku, isSecondary = false) => {
    if (comparisonMode) {
      if (isSecondary) {
        JEELIZVTOWIDGET.load(sku, refCanvas2.current);
      } else {
        JEELIZVTOWIDGET.load(sku, refCanvas.current);
      }
    } else {
      JEELIZVTOWIDGET.load(sku);
      setCurrentModel(sku);
    }
  };

  // Photo capture function
  const capturePhoto = (isSecondary = false) => {
    if (clickCount >= maxClicks) {
      alert('Bạn đã chụp đủ số ảnh!');
      return;
    }
    const canvas = isSecondary ? refCanvas2.current : refCanvas.current;
    const dataUrl = canvas.toDataURL('image/png');
    setPhotos(prev => [...prev, { 
      url: dataUrl, 
      model: isSecondary ? comparedGlasses[1]?.sku : currentModel 
    }]);
    setClickCount(prev => prev + 1);
  };

  // Photo management functions
  const handleDeletePhoto = (index) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
    setClickCount(prev => prev - 1);
  };

  // Comparison mode functions
  const toggleComparisonMode = () => {
    setComparisonMode(prev => !prev);
    if (!comparisonMode) {
      init_VTOWidget(refPlaceHolder2.current, refCanvas2.current, true);
    }
  };

  const handleCompareGlasses = (glass) => {
    if (comparedGlasses.length < 2) {
      setComparedGlasses(prev => [...prev, glass]);
      if (comparedGlasses.length === 0) {
        set_glassesModel(glass.sku, false);
      } else {
        set_glassesModel(glass.sku, true);
      }
    }
  };

  // Filter functions
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({...prev, [filterType]: value}));
  };

  const filteredGlasses = glassesModels.filter(glass => {
    return (!filters.frame || glass.categories.frame === filters.frame) &&
           (!filters.lens || glass.categories.lens === filters.lens) &&
           (!filters.type || glass.categories.type === filters.type);
  });

  // Initialize widget on component mount
  useEffect(() => {
    init_VTOWidget(refPlaceHolder.current, refCanvas.current);
    return () => JEELIZVTOWIDGET.destroy();
  }, []);

  // JSX Structure
  return (
    <div className="vto-container">
      <div className={`main-content ${comparisonMode ? 'comparison-mode' : ''}`}>
        {/* Comparison Mode View */}
        {comparisonMode ? (
          <div className="comparison-view">
            <div className="comparison-side">
              <div ref={refPlaceHolder} className="JeelizVTOWidget">
                <canvas ref={refCanvas} className="JeelizVTOWidgetCanvas" />
                <div className="canvas-controls">
                  <button onClick={() => capturePhoto(false)}>
                    <i className="fas fa-camera"></i> Chụp ảnh
                  </button>
                </div>
              </div>
            </div>
            <div className="comparison-side">
              <div ref={refPlaceHolder2} className="JeelizVTOWidget">
                <canvas ref={refCanvas2} className="JeelizVTOWidgetCanvas" />
                <div className="canvas-controls">
                  <button onClick={() => capturePhoto(true)}>
                    <i className="fas fa-camera"></i> Chụp ảnh
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Normal Mode View */
          <div ref={refPlaceHolder} className="JeelizVTOWidget">
            <canvas ref={refCanvas} className="JeelizVTOWidgetCanvas" />
          </div>
        )}

        {/* Controls Container */}
        <div className="controls-container">
          {/* Main Controls */}
          {!isAdjustMode && (
            <div className="main-controls">
              <button className="control-button adjust" onClick={enter_adjustMode}>
                <i className="fas fa-arrows-alt"></i> Điều chỉnh
              </button>
              <button className="control-button capture" onClick={() => capturePhoto(false)}>
                <i className="fas fa-camera"></i> Chụp ảnh
              </button>
              <button 
                className="control-button compare" 
                onClick={toggleComparisonMode}
              >
                <i className="fas fa-columns"></i> 
                {comparisonMode ? 'Tắt so sánh' : 'Bật so sánh'}
              </button>
            </div>
          )}

          {/* Adjust Mode Notice */}
          {isAdjustMode && (
            <div className="adjust-notice">
              <p>Di chuyển kính để điều chỉnh</p>
              <button className="control-button" onClick={exit_adjustMode}>
                <i className="fas fa-check"></i> Xong
              </button>
            </div>
          )}

          {/* Filters */}
          <div className="filters-container">
            <select 
              value={filters.frame}
              onChange={(e) => handleFilterChange('frame', e.target.value)}
            >
              <option value="">Tất cả gọng kính</option>
              {Object.values(GLASS_CATEGORIES.FRAME).map(frame => (
                <option key={frame} value={frame}>{frame}</option>
              ))}
            </select>

            <select 
              value={filters.lens}
              onChange={(e) => handleFilterChange('lens', e.target.value)}
            >
              <option value="">Tất cả tròng kính</option>
              {Object.values(GLASS_CATEGORIES.LENS).map(lens => (
                <option key={lens} value={lens}>{lens}</option>
              ))}
            </select>

            <select 
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
            >
              <option value="">Tất cả kiểu kính</option>
              {Object.values(GLASS_CATEGORIES.TYPE).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Models List */}
          <div className="models-container">
            {filteredGlasses.map((model) => (
              <div key={model.id} className="model-item">
                <button
                  className={`model-button ${
                    comparisonMode 
                      ? comparedGlasses.includes(model) ? 'active' : ''
                      : currentModel === model.sku ? 'active' : ''
                  }`}
                  onClick={() => comparisonMode 
                    ? handleCompareGlasses(model)
                    : set_glassesModel(model.sku)
                  }
                >
                  <span className="model-name">{model.name}</span>
                  <span className="model-price">{model.price}</span>
                  <span className="model-details">{model.details}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Loading Overlay */}
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div className="loading-text">Đang tải...</div>
        </div>
      </div>

      {/* Photos Gallery */}
      <div className="photos-gallery">
        <h3>Ảnh đã chụp ({photos.length}/{maxClicks})</h3>
        {photos.map((photo, index) => (
          <div key={index} className="photo-item">
            <img src={photo.url} alt={`Ảnh ${index + 1}`} />
            <div className="photo-controls">
              <button 
                onClick={() => handleDeletePhoto(index)} 
                className="delete-button"
                title="Xóa ảnh"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AppCanvas;