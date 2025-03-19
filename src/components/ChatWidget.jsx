// ChatWidget.js - Create this as a new component
import React, { useState, useRef, useEffect } from 'react';

function ChatWidget({ onSelectModel, glassesModels, glassCategories }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Xin chào! Tôi có thể giúp bạn tìm kính phù hợp. Hãy cho tôi biết hình dáng khuôn mặt hoặc màu sắc bạn thích.' }
  ]);
  
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);
  
  const toggleChat = () => setIsOpen(!isOpen);
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputText.trim() === '') return;
    
    // Add user message
    setChatMessages(prev => [...prev, { sender: 'user', text: inputText }]);
    
    // Generate response based on user input
    const botResponse = generateResponse(inputText, glassesModels, glassCategories);
    
    // Add small delay to seem more natural
    setTimeout(() => {
      setChatMessages(prev => [...prev, { sender: 'bot', text: botResponse.text }]);
      
      // Add recommendation if available
      if (botResponse.recommendation) {
        setChatMessages(prev => [...prev, { 
          sender: 'bot', 
          text: 'Bạn có thể thử mẫu kính này:',
          recommendation: botResponse.recommendation 
        }]);
      }
    }, 600);
    
    setInputText('');
  };
  
  // Process input and generate appropriate responses
// This replaces the generateResponse function in ChatWidget.js

const generateResponse = (input, glassesModels, categories) => {
  const lowerInput = input.toLowerCase();
  
  // Face shape recommendations
  if (lowerInput.includes('mặt tròn') || lowerInput.includes('khuôn mặt tròn')) {
    const recommendations = glassesModels.filter(glass => 
      glass.categories.type === categories.TYPE.SQUARE || 
      glass.categories.type === categories.TYPE.AVIATOR
    );
    
    return {
      text: 'Với khuôn mặt tròn, bạn nên chọn kính có góc cạnh như vuông hoặc phi công để cân bằng.',
      recommendation: recommendations.length > 0 ? recommendations[Math.floor(Math.random() * recommendations.length)] : null
    };
  }
  
  if (lowerInput.includes('mặt vuông') || lowerInput.includes('khuôn mặt vuông')) {
    const recommendations = glassesModels.filter(glass => 
      glass.categories.type === categories.TYPE.ROUND || 
      glass.categories.type === categories.TYPE.AVIATOR
    );
    
    return {
      text: 'Với khuôn mặt vuông, kính tròn hoặc phi công sẽ làm mềm các đường nét góc cạnh.',
      recommendation: recommendations.length > 0 ? recommendations[Math.floor(Math.random() * recommendations.length)] : null
    };
  }
  
  if (lowerInput.includes('mặt oval') || lowerInput.includes('mặt trái xoan')) {
    const recommendations = glassesModels.filter(glass => 
      glass.categories.type === categories.TYPE.WAYFARER || 
      glass.categories.type === categories.TYPE.AVIATOR
    );
    
    return {
      text: 'Khuôn mặt trái xoan rất cân đối, bạn có thể thử hầu hết các kiểu kính. Kiểu wayfarer hoặc aviator rất phù hợp.',
      recommendation: recommendations.length > 0 ? recommendations[Math.floor(Math.random() * recommendations.length)] : null
    };
  }
  
  if (lowerInput.includes('mặt trái tim') || lowerInput.includes('mặt tam giác')) {
    const recommendations = glassesModels.filter(glass => 
      glass.categories.type === categories.TYPE.CAT_EYE || 
      glass.categories.type === categories.TYPE.ROUND
    );
    
    return {
      text: 'Với khuôn mặt trái tim/tam giác, kính mắt mèo hoặc kính tròn sẽ cân bằng phần cằm nhỏ.',
      recommendation: recommendations.length > 0 ? recommendations[Math.floor(Math.random() * recommendations.length)] : null
    };
  }
  
  // Frame color preferences
  if (lowerInput.includes('đen') || lowerInput.includes('gọng đen')) {
    const recommendations = glassesModels.filter(glass => 
      glass.categories.frame === categories.FRAME.BLACK
    );
    
    return {
      text: 'Kính gọng đen rất dễ phối đồ và phù hợp với mọi tông da.',
      recommendation: recommendations.length > 0 ? recommendations[Math.floor(Math.random() * recommendations.length)] : null
    };
  }
  
  if (lowerInput.includes('vàng') || lowerInput.includes('gọng vàng')) {
    const recommendations = glassesModels.filter(glass => 
      glass.categories.frame === categories.FRAME.GOLD
    );
    
    return {
      text: 'Kính gọng vàng tạo vẻ sang trọng và phù hợp với tông da ấm.',
      recommendation: recommendations.length > 0 ? recommendations[Math.floor(Math.random() * recommendations.length)] : null
    };
  }
  
  if (lowerInput.includes('bạc') || lowerInput.includes('gọng bạc') || lowerInput.includes('silver')) {
    const recommendations = glassesModels.filter(glass => 
      glass.categories.frame === categories.FRAME.SILVER
    );
    
    return {
      text: 'Kính gọng bạc mang vẻ hiện đại, thanh lịch và dễ phối đồ.',
      recommendation: recommendations.length > 0 ? recommendations[Math.floor(Math.random() * recommendations.length)] : null
    };
  }
  
  if (lowerInput.includes('nâu') || lowerInput.includes('gọng nâu') || lowerInput.includes('havana')) {
    const recommendations = glassesModels.filter(glass => 
      glass.categories.frame === categories.FRAME.HAVANA || 
      glass.categories.frame === categories.FRAME.BROWN
    );
    
    return {
      text: 'Kính gọng nâu/havana mang vẻ cổ điển, ấm áp và tự nhiên.',
      recommendation: recommendations.length > 0 ? recommendations[Math.floor(Math.random() * recommendations.length)] : null
    };
  }
  
  // Lens color preferences
  if (lowerInput.includes('tròng xanh') || lowerInput.includes('kính xanh')) {
    const recommendations = glassesModels.filter(glass => 
      glass.categories.lens === categories.LENS.BLUE
    );
    
    return {
      text: 'Tròng kính màu xanh giúp giảm ánh sáng chói và tạo vẻ thời trang.',
      recommendation: recommendations.length > 0 ? recommendations[Math.floor(Math.random() * recommendations.length)] : null
    };
  }
  
  if (lowerInput.includes('tròng xám') || lowerInput.includes('kính xám')) {
    const recommendations = glassesModels.filter(glass => 
      glass.categories.lens === categories.LENS.GRAY
    );
    
    return {
      text: 'Tròng kính màu xám cho màu sắc trung thực nhất, phù hợp lái xe và sử dụng hàng ngày.',
      recommendation: recommendations.length > 0 ? recommendations[Math.floor(Math.random() * recommendations.length)] : null
    };
  }
  
  if (lowerInput.includes('tròng xanh lá') || lowerInput.includes('kính xanh lá')) {
    const recommendations = glassesModels.filter(glass => 
      glass.categories.lens === categories.LENS.GREEN
    );
    
    return {
      text: 'Tròng kính màu xanh lá cải thiện độ tương phản, phù hợp cho các hoạt động ngoài trời.',
      recommendation: recommendations.length > 0 ? recommendations[Math.floor(Math.random() * recommendations.length)] : null
    };
  }
  
  if (lowerInput.includes('tròng nâu') || lowerInput.includes('kính nâu')) {
    const recommendations = glassesModels.filter(glass => 
      glass.categories.lens === categories.LENS.BROWN
    );
    
    return {
      text: 'Tròng kính màu nâu tăng độ tương phản và độ sâu, tốt cho các điều kiện ánh sáng thay đổi.',
      recommendation: recommendations.length > 0 ? recommendations[Math.floor(Math.random() * recommendations.length)] : null
    };
  }
  
  // Style preferences
  if (lowerInput.includes('aviator') || lowerInput.includes('phi công')) {
    const recommendations = glassesModels.filter(glass => 
      glass.categories.type === categories.TYPE.AVIATOR
    );
    
    return {
      text: 'Kính phi công (Aviator) là phong cách kinh điển, phù hợp với nhiều khuôn mặt.',
      recommendation: recommendations.length > 0 ? recommendations[Math.floor(Math.random() * recommendations.length)] : null
    };
  }
  
  if (lowerInput.includes('wayfarer') || lowerInput.includes('kính vuông')) {
    const recommendations = glassesModels.filter(glass => 
      glass.categories.type === categories.TYPE.WAYFARER
    );
    
    return {
      text: 'Kính Wayfarer là kiểu dáng kinh điển với phần trên rộng, phù hợp nhiều khuôn mặt.',
      recommendation: recommendations.length > 0 ? recommendations[Math.floor(Math.random() * recommendations.length)] : null
    };
  }
  
  if (lowerInput.includes('clubmaster') || lowerInput.includes('browline')) {
    const recommendations = glassesModels.filter(glass => 
      glass.categories.type === categories.TYPE.CLUBMASTER
    );
    
    return {
      text: 'Kính Clubmaster với phần viền trên đậm tạo vẻ tri thức, thanh lịch.',
      recommendation: recommendations.length > 0 ? recommendations[Math.floor(Math.random() * recommendations.length)] : null
    };
  }
  
  if (lowerInput.includes('mắt mèo') || lowerInput.includes('cat eye')) {
    const recommendations = glassesModels.filter(glass => 
      glass.categories.type === categories.TYPE.CAT_EYE
    );
    
    return {
      text: 'Kính mắt mèo với viền trên cong vút tạo vẻ nữ tính, sang trọng.',
      recommendation: recommendations.length > 0 ? recommendations[Math.floor(Math.random() * recommendations.length)] : null
    };
  }
  
  if (lowerInput.includes('kính tròn') || lowerInput.includes('round')) {
    const recommendations = glassesModels.filter(glass => 
      glass.categories.type === categories.TYPE.ROUND
    );
    
    return {
      text: 'Kính tròn mang phong cách vintage, nghệ sĩ và trí thức.',
      recommendation: recommendations.length > 0 ? recommendations[Math.floor(Math.random() * recommendations.length)] : null
    };
  }
  
  // Usage scenario questions
  if (lowerInput.includes('thể thao') || lowerInput.includes('chạy bộ') || lowerInput.includes('đạp xe')) {
    const recommendations = glassesModels.filter(glass => 
      glass.categories.type === categories.TYPE.SPORT
    );
    
    return {
      text: 'Cho hoạt động thể thao, bạn nên chọn kính thể thao với độ bám tốt và trọng lượng nhẹ.',
      recommendation: recommendations.length > 0 ? recommendations[Math.floor(Math.random() * recommendations.length)] : null
    };
  }
  
  if (lowerInput.includes('đi biển') || lowerInput.includes('bơi')) {
    const recommendations = glassesModels.filter(glass => 
      glass.categories.lens === categories.LENS.MIRROR || 
      glass.categories.lens === categories.LENS.FLASH
    );
    
    return {
      text: 'Khi đi biển, kính với tròng phản quang hoặc flash sẽ bảo vệ mắt tốt nhất khỏi ánh sáng mạnh.',
      recommendation: recommendations.length > 0 ? recommendations[Math.floor(Math.random() * recommendations.length)] : null
    };
  }
  
  // General questions
  if (lowerInput.includes('kính phù hợp') || lowerInput.includes('gợi ý')) {
    return {
      text: 'Để gợi ý kính phù hợp, bạn có thể cho tôi biết hình dáng khuôn mặt (tròn, vuông, oval...), màu sắc ưa thích, hoặc mục đích sử dụng.'
    };
  }
  
  if (lowerInput.includes('chào') || lowerInput.includes('xin chào') || lowerInput.includes('hello')) {
    return {
      text: 'Xin chào! Tôi có thể giúp gì cho bạn về việc chọn kính mắt? Bạn muốn tìm kính theo màu sắc, kiểu dáng hay phù hợp với khuôn mặt?'
    };
  }
  
  if (lowerInput.includes('cảm ơn') || lowerInput.includes('thank')) {
    return {
      text: 'Rất vui được giúp bạn! Nếu bạn còn câu hỏi nào khác về kính mắt, cứ hỏi tôi nhé.'
    };
  }
  
  // Default responses
  const defaultResponses = [
    "Bạn có thể hỏi về kính phù hợp với hình dáng khuôn mặt hoặc màu sắc yêu thích.",
    "Bạn thích gọng kính màu gì? Đen, vàng, bạc hay màu khác?",
    "Bạn có thể hỏi tôi về kính phù hợp với khuôn mặt tròn, vuông, trái xoan hoặc hình trái tim.",
    "Bạn muốn tìm kính cho mục đích gì? Đi chơi, đi làm hay hoạt động thể thao?",
  ];
  
  return {
    text: defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  };
};
  
  const handleRecommendationClick = (glass) => {
    onSelectModel(glass.sku);
    setChatMessages(prev => [...prev, { 
      sender: 'bot', 
      text: `Bạn đang thử mẫu kính: ${glass.name}`
    }]);
  };
  
  return (
    <div className="chat-widget">
      <button className="chat-toggle" onClick={toggleChat}>
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-comments'}`}></i>
      </button>
      
      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <h3>Tư vấn kính</h3>
          </div>
          
          <div className="chat-messages">
            {chatMessages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                <div className="message-content">
                  {message.text}
                  
                  {message.recommendation && (
                    <div className="recommendation">
                      <div className="recommendation-info">
                        <div>{message.recommendation.name}</div>
                        <div className="recommendation-price">{message.recommendation.price}</div>
                      </div>
                      <button 
                        onClick={() => handleRecommendationClick(message.recommendation)}
                        className="try-button"
                      >
                        Thử ngay
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <form className="chat-input" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Hỏi về kính phù hợp..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit">
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ChatWidget;