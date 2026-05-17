import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { FileStats as FileStatsType } from "../types";
import { CATEGORY_COLORS, formatSize } from "../utils/fileClassifier";
import { BarChart3, PieChart as PieChartIcon } from "lucide-react";

interface FileStatsProps {
  stats: FileStatsType | null;
}

export const FileStats: React.FC<FileStatsProps> = ({ stats }) => {
  if (!stats) return null;

  const pieData = Object.entries(stats.byCategory)
    .filter(([_, data]) => data.count > 0)
    .map(([category, data]) => ({
      name:
        CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS]?.label ||
        category,
      value: data.count,
      size: data.size,
      color:
        CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS]?.iconColor ||
        "#C8C8D2",
      bgColor:
        CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS]?.bgColor ||
        "rgba(200,200,210,0.2)",
    }))
    .sort((a, b) => b.value - a.value);

  const barData = [...pieData].sort((a, b) => b.size - a.size).slice(0, 8);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="chart-tooltip">
          <div className="chart-tooltip-header">
            <span
              className="chart-tooltip-dot"
              style={{ background: data.color }}
            />
            <span>{data.name}</span>
          </div>
          <div className="chart-tooltip-row">
            <span>文件数:</span>
            <span>{data.value}</span>
          </div>
          {(data.size || data.size === 0) && (
            <div className="chart-tooltip-row">
              <span>总大小:</span>
              <span>{formatSize(data.size)}</span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="file-stats">
      <div className="stats-summary">
        <div className="stat-card">
          <span className="stat-value">{stats.totalFiles}</span>
          <span className="stat-label">文件总数</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.totalFolders}</span>
          <span className="stat-label">文件夹数</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{formatSize(stats.totalSize)}</span>
          <span className="stat-label">总大小</span>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <div className="chart-card-header">
            <PieChartIcon size={16} />
            <span>文件类型分布</span>
          </div>
          <div className="chart-card-body">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke={entry.bgColor}
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="chart-empty">暂无数据</p>
            )}
            <div className="chart-legend">
              {pieData.slice(0, 6).map((entry, idx) => (
                <div key={idx} className="legend-item">
                  <span
                    className="legend-dot"
                    style={{ background: entry.color }}
                  />
                  <span className="legend-label">{entry.name}</span>
                  <span className="legend-value">{entry.value}</span>
                </div>
              ))}
              {pieData.length > 6 && (
                <div className="legend-more">+{pieData.length - 6} 更多</div>
              )}
            </div>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <BarChart3 size={16} />
            <span>文件大小排名</span>
          </div>
          <div className="chart-card-body">
            {barData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={barData} layout="vertical">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)"
                  />
                  <XAxis
                    type="number"
                    tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11 }}
                    width={60}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="size" radius={[0, 4, 4, 0]}>
                    {barData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="chart-empty">暂无数据</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
