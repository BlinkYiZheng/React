import { useState } from 'react';
import './TabBar.css';

function TabBar() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div>
      <div className="tabbar-container">
        <button className={activeTab === 'home' ? 'active' : ''} onClick={() => setActiveTab('home')}>
          Home
        </button>
        <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
          Settings
        </button>
        {/* ... 添加更多 tabs ... */}
      </div>
      
      {/* 根据选中的 tab 显示内容 */}
      {activeTab === 'home' && <div>Home content</div>}
      {activeTab === 'settings' && <div>Settings content</div>}
      {/* ... 添加更多内容组件 ... */}
    </div>
  );
}

export default TabBar;
