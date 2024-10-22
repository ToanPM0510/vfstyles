import React, { useRef, useEffect, useState } from 'react';
import { JEELIZVTO, JEELIZVTOWIDGET } from 'jeelizvtowidget';
import searchImage from '../assets/462638079_541639745119771_352923006521251447_n.png';

function init_VTOWidget(placeHolder, canvas, toggle_loading) {
  JEELIZVTOWIDGET.start({
    placeHolder,
    canvas,
    callbacks: {
      ADJUST_START: null,
      ADJUST_END: null,
      LOADING_START: toggle_loading.bind(null, true),
      LOADING_END: toggle_loading.bind(null, false),
    },
    sku: 'rayban_clubmaster_noir_bleuGris',
    searchImageMask: searchImage,
    searchImageColor: 0xeeeeee,
    searchImageRotationSpeed: -0.001,
    callbackReady: function () {
      console.log('INFO: JEELIZVTOWIDGET is ready :)');
    },
    onError: function (errorLabel) {
      alert('An error happened. errorLabel =' + errorLabel);
      switch (errorLabel) {
        case 'WEBCAM_UNAVAILABLE':
          break;
        case 'INVALID_SKU':
          break;
        case 'PLACEHOLDER_NULL_WIDTH':
        case 'PLACEHOLDER_NULL_HEIGHT':
          break;
        case 'FATAL':
        default:
          break;
      }
    },
  });
}

function AppCanvas(props) {
  const refPlaceHolder = useRef();
  const refCanvas = useRef();
  const refAdjustEnter = useRef();
  const refAdjust = useRef();
  const refChangeModel = useRef();
  const refLoading = useRef();
  const [photos, setPhotos] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const maxClicks = 2;
  

  const toggle_loading = (isLoadingVisible) => {
    refLoading.current.style.display = isLoadingVisible ? 'block' : 'none';
  };

  const enter_adjustMode = () => {
    JEELIZVTOWIDGET.enter_adjustMode();
    refAdjustEnter.current.style.display = 'none';
    refAdjust.current.style.display = 'block';
    refChangeModel.current.style.display = 'none';
  };

  const exit_adjustMode = () => {
    JEELIZVTOWIDGET.exit_adjustMode();
    refAdjustEnter.current.style.display = 'block';
    refAdjust.current.style.display = 'none';
    refChangeModel.current.style.display = 'block';
  };

  const set_glassesModel = (sku) => {
    JEELIZVTOWIDGET.load(sku);
  };

  const capturePhoto = () => {
    if (clickCount < maxClicks) {
      const canvas = refCanvas.current;
      const dataUrl = canvas.toDataURL('image/png'); 
      setPhotos((prevPhotos) => [...prevPhotos, dataUrl]); 
      setClickCount(prevCount => prevCount + 1);
    } else {
      alert('Các mẫu kính bạn thử trông rất hợp với bạn! Hãy dừng chụp ảnh thêm nữa và suy nghĩ kỹ để chọn ra mẫu hoàn hảo nhất nhé!');
    }
  };
  const handleRetryPhoto = () => {
    setClickCount(prevCount => {
      const newCount = Math.max(prevCount - 1, 0); 
      capturePhoto(newCount); 
      return newCount;
    });
  };
  const handleDeletePhoto = (index) => {
    
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
    
    setClickCount(prevCount => Math.max(prevCount - 1, 0));
  };
  useEffect(() => {
    const placeHolder = refPlaceHolder.current;
    const canvas = refCanvas.current;
    init_VTOWidget(placeHolder, canvas, toggle_loading);

    return () => {
      //JEELIZVTOWIDGET.destroy();
    };
  }, []);

  return (
    <div>
      <div ref={refPlaceHolder} className='JeelizVTOWidget'>
        <canvas ref={refCanvas} className='JeelizVTOWidgetCanvas'>
        </canvas>

        <div ref={refAdjustEnter} className='JeelizVTOWidgetControls'>
          <button className='JeelizVTOWidgetButton JeelizVTOWidgetAdjustEnterButton' onClick={enter_adjustMode}>
            Adjust
          </button>
          <button className='JeelizVTOWidgetButton' onClick={capturePhoto}>
            Take a photo
          </button>
        </div>


        <div ref={refAdjust} className='JeelizVTOWidgetAdjustNotice'>
          Move the glasses to adjust them.
          <button className='JeelizVTOWidgetButton JeelizVTOWidgetAdjustExitButton' onClick={exit_adjustMode}>
            Quit
          </button>
        </div>

        <div ref={refChangeModel} className='JeelizVTOWidgetControls JeelizVTOWidgetChangeModelContainer'>
          <button className='JeelizVTOWidgetButton' onClick={set_glassesModel.bind(this, 'rayban_cockpit_or_vert_classique')}>Model 1</button>
          <button className='JeelizVTOWidgetButton' onClick={set_glassesModel.bind(this, 'rayban_round_cuivre_pinkBrownDegrade')}>Model 2</button>
          <button className='JeelizVTOWidgetButton' onClick={set_glassesModel.bind(this, 'rayban_new_wayfarer_havane_marron_clair_degrade')}>Model 3</button>
        </div>



        <div ref={refLoading} className='JeelizVTOWidgetLoading'>
          <div className='JeelizVTOWidgetLoadingText'>LOADING...</div>
        </div>
      </div>

      <div style={{ position: 'fixed', top: 10, right: 10, display: 'flex', flexDirection: 'column' }}>
        {photos.map((photo, index) => (
          <div key={index} className="picture" style={{ position: 'relative', marginBottom: 5 }}>
            <img 
              src={photo} 
              alt={`Ảnh ${index}`} 
              style={{ width: 300 }}
            />
        <div className="picture__img__options" style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <button className="picture__img__delete" style={{ position: 'absolute', top: 0, right: 0 }} onClick={() => handleDeletePhoto(index)}>✕</button>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '25px' }}>
            <div className="picture__img__options__share" style={{ marginRight: 10 }}>
              <img className="picture__img__options__share__img" src="https://www.svgrepo.com/show/78468/share.svg" alt="Share" />
            </div>
            <div className="picture__img__options__details">
            <a href="https://vn.shp.ee/kiDhq51" target="_blank" rel="noopener noreferrer">
              <img className="picture__img__options__details__img" src="https://jeeliz.com/sunglasses/images/dollar-notwhite.svg" alt="Details" />
            </a>
            </div>
          </div>
        </div>
          </div>
        ))}
      </div>


    </div>
  );
}

export default AppCanvas;
