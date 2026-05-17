import { useState } from "react";
import { useFileScanner } from "./hooks/useFileScanner";
import { Toolbar } from "./components/Toolbar";
import { FileGrid } from "./components/FileGrid";
import { FileStats } from "./components/FileStats";
import { DropZone } from "./components/DropZone";
import "./App.css";

function App() {
  const {
    loading,
    result,
    error,
    searchQuery,
    setSearchQuery,
    selectFolder,
    scanFolder,
    filteredTree,
  } = useFileScanner();

  const [showStats, setShowStats] = useState(true);
  const tree = filteredTree();

  const handleRefresh = () => {
    if (result?.rootPath) {
      scanFolder(result.rootPath);
    }
  };

  return (
    <div className="app">
      {/* 背景装饰 */}
      <div className="bg-decoration">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
      </div>

      {/* 顶部栏 */}
      <header className="app-header">
        <div className="app-logo">
          <div className="app-logo-icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <line x1="10" y1="9" x2="8" y2="9" />
            </svg>
          </div>
          <h1 className="app-title">文件可视化管理器</h1>
        </div>
        <Toolbar
          onSelectFolder={selectFolder}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          loading={loading}
          rootPath={result?.rootPath ?? null}
          onRefresh={handleRefresh}
        />
      </header>

      {/* 错误提示 */}
      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={() => {}} className="error-dismiss">
            ×
          </button>
        </div>
      )}

      {/* 主内容区 */}
      <main className="app-main">
        <DropZone
          onFolderDrop={(path) => scanFolder(path)}
          hasContent={!!result}
        >
          <>
            {result && showStats && (
              <section className="stats-section">
                <div className="stats-section-header">
                  <h2>统计概览</h2>
                  <button
                    className="collapse-btn"
                    onClick={() => setShowStats(false)}
                  >
                    收起
                  </button>
                </div>
                <FileStats stats={result.stats} />
              </section>
            )}

            {result && !showStats && (
              <button
                className="expand-stats-btn"
                onClick={() => setShowStats(true)}
              >
                显示统计概览
              </button>
            )}

            <section className="grid-section">
              <FileGrid
                tree={tree}
                searchQuery={searchQuery}
                loading={loading}
              />
            </section>
          </>
        </DropZone>
      </main>
    </div>
  );
}

export default App;
