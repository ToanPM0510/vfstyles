import React, { useRef, useEffect, useState } from 'react';
import { JEELIZVTOWIDGET } from 'jeelizvtowidget';
import searchImage from '../assets/462638079_541639745119771_352923006521251447_n.png';

function AppCanvas() {
  const refPlaceHolder = useRef();
  const refCanvas = useRef();
  const refAdjustEnter = useRef();
  const refAdjust = useRef();
  const refChangeModel = useRef();
  const refLoading = useRef();
  const [photos, setPhotos] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [currentModel, setCurrentModel] = useState('rayban_clubmaster_noir_bleuGris');
  const maxClicks = 2;
  const [isAdjustMode, setIsAdjustMode] = useState(false);

  // Danh sách models kính
  const glassesModels = [
    {
      id: 'model1',
      sku: 'rayban_cockpit_or_vert_classique',
      name: 'Rayban Cockpit',
      price: '₫2,590,000'
    },
    {
      id: 'model2',
      sku: 'rayban_round_cuivre_pinkBrownDegrade',
      name: 'Rayban Round',
      price: '₫2,890,000'
    },
    {
      id: 'model3',
      sku: 'rayban_new_wayfarer_havane_marron_clair_degrade',
      name: 'Rayban Wayfarer',
      price: '₫3,190,000'
    }
  ];

  const init_VTOWidget = (placeHolder, canvas) => {
    JEELIZVTOWIDGET.start({
      placeHolder,
      canvas,
      callbacks: {
        ADJUST_START: () => setIsAdjustMode(true),
        ADJUST_END: () => setIsAdjustMode(false),
        LOADING_START: () => refLoading.current.style.display = 'block',
        LOADING_END: () => refLoading.current.style.display = 'none',
      },
      sku: currentModel,
      searchImageMask: searchImage,
      searchImageColor: 0xeeeeee,
      searchImageRotationSpeed: -0.001,
      callbackReady: () => {
        console.log('JEELIZVTOWIDGET is ready');
      },
      onError: (errorLabel) => {
        console.error('Error:', errorLabel);
        alert('Đã xảy ra lỗi. Vui lòng thử lại!');
      }
    });
  };

  const enter_adjustMode = () => {
    JEELIZVTOWIDGET.enter_adjustMode();
    setIsAdjustMode(true);
  };

  const exit_adjustMode = () => {
    JEELIZVTOWIDGET.exit_adjustMode();
    setIsAdjustMode(false);
  };

  const set_glassesModel = (sku) => {
    JEELIZVTOWIDGET.load(sku);
    setCurrentModel(sku);
  };

  const capturePhoto = () => {
    if (clickCount >= maxClicks) {
      alert('Bạn đã chụp đủ số ảnh cho phép (2 ảnh). Hãy xóa bớt ảnh để chụp thêm!');
      return;
    }

    const canvas = refCanvas.current;
    const dataUrl = canvas.toDataURL('image/png');
    setPhotos(prev => [...prev, { url: dataUrl, model: currentModel }]);
    setClickCount(prev => prev + 1);
  };

  const handleDeletePhoto = (index) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
    setClickCount(prev => prev - 1);
  };

  const handleShare = async (photoUrl, platform) => {
    // Hiện thông báo tạm thời
    alert('Tính năng đang được phát triển. Xin vui lòng thử lại sau!');
  };

  useEffect(() => {
    init_VTOWidget(refPlaceHolder.current, refCanvas.current);
    return () => {
      JEELIZVTOWIDGET.destroy();
    };
  }, []);

  return (
    <div className="vto-container">
      <div className="main-content">
        <div ref={refPlaceHolder} className="JeelizVTOWidget">
          <canvas ref={refCanvas} className="JeelizVTOWidgetCanvas" />
          
          <div className="controls-container">
            {!isAdjustMode && (
              <div className="main-controls">
                <button className="control-button adjust" onClick={enter_adjustMode}>
                  <i className="fas fa-arrows-alt"></i> Điều chỉnh
                </button>
                <button className="control-button capture" onClick={capturePhoto}>
                  <i className="fas fa-camera"></i> Chụp ảnh
                </button>
              </div>
            )}

            {isAdjustMode && (
              <div className="adjust-notice">
                <p>Di chuyển kính để điều chỉnh vị trí</p>
                <button className="control-button" onClick={exit_adjustMode}>
                  <i className="fas fa-check"></i> Xong
                </button>
              </div>
            )}

            <div className="models-container">
              {glassesModels.map((model) => (
                <button
                  key={model.id}
                  className={`model-button ${currentModel === model.sku ? 'active' : ''}`}
                  onClick={() => set_glassesModel(model.sku)}
                >
                  {model.name}
                  <span className="price">{model.price}</span>
                </button>
              ))}
            </div>
          </div>

          <div ref={refLoading} className="loading-overlay">
            <div className="loading-spinner"></div>
            <div className="loading-text">Đang tải...</div>
          </div>
        </div>
      </div>

      <div className="photos-gallery">
        {photos.map((photo, index) => (
<div className="photo-item">
  <img src={photo.url} alt={`Ảnh thử kính ${index + 1}`} />
  <div className="photo-controls">
    <div className="share-group">
      <button 
        className="share-button facebook"
        onClick={() => handleShare(photo.url, 'facebook')}
        title="Chia sẻ lên Facebook"
      >
        <i className="fab fa-facebook"></i>
      </button>
      <button 
        className="share-button messenger"
        onClick={() => handleShare(photo.url, 'messenger')}
        title="Chia sẻ qua Messenger"
      >
        <i className="fab fa-facebook-messenger"></i>
      </button>
      <button 
        className="share-button twitter"
        onClick={() => handleShare(photo.url, 'twitter')}
        title="Chia sẻ lên Twitter"
      >
        <i className="fab fa-twitter"></i>
      </button>
    </div>
    <div className="action-group">
      <a 
        href="https://vn.shp.ee/kiDhq51" 
        target="_blank" 
        rel="noopener noreferrer"
        className="buy-button"
        title="Mua ngay"
      >
        <i className="fas fa-shopping-cart"></i>
      </a>
      <button 
        onClick={() => handleDeletePhoto(index)} 
        className="delete-button"
        title="Xóa ảnh"
      >
        <i className="fas fa-trash"></i>
      </button>
    </div>
  </div>
</div>
        ))}
      </div>
    </div>
  );
}

export default AppCanvas;