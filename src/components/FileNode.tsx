import React, { useState } from "react";
import {
  FileText,
  Image,
  Music,
  Video,
  Archive,
  Code,
  Settings,
  Database,
  Terminal,
  Type,
  Palette,
  File,
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
} from "lucide-react";
import { FileNodeData } from "../types";
import { CATEGORY_COLORS } from "../utils/fileClassifier";

interface FileNodeProps {
  node: FileNodeData;
  searchHighlight?: string;
}

const categoryIcons: Record<string, React.ElementType> = {
  document: FileText,
  image: Image,
  audio: Music,
  video: Video,
  archive: Archive,
  code: Code,
  config: Settings,
  data: Database,
  executable: Terminal,
  font: Type,
  design: Palette,
  other: File,
};

export const FileNode: React.FC<FileNodeProps> = ({
  node,
  searchHighlight,
}) => {
  const [expanded, setExpanded] = useState(node.depth < 2);
  const Icon = node.isDirectory
    ? expanded
      ? FolderOpen
      : Folder
    : categoryIcons[node.category] || File;

  const colors = CATEGORY_COLORS[node.category];

  const highlightName = (name: string) => {
    if (!searchHighlight) return name;
    const idx = name.toLowerCase().indexOf(searchHighlight.toLowerCase());
    if (idx === -1) return name;
    return (
      <>
        {name.slice(0, idx)}
        <span className="search-highlight">
          {name.slice(idx, idx + searchHighlight.length)}
        </span>
        {name.slice(idx + searchHighlight.length)}
      </>
    );
  };

  const handleToggle = () => {
    if (node.isDirectory) setExpanded(!expanded);
  };

  return (
    <div className="file-node-wrapper">
      <div
        className="file-node"
        style={{
          paddingLeft: `${node.depth * 20 + 8}px`,
          background: node.isDirectory
            ? "rgba(255, 255, 255, 0.03)"
            : `linear-gradient(135deg, ${colors.glowColor}, transparent)`,
          borderLeft: node.isDirectory
            ? "2px solid rgba(255,255,255,0.1)"
            : `2px solid ${colors.borderColor}`,
        }}
        onClick={handleToggle}
      >
        <span className="file-node-chevron">
          {node.isDirectory ? (
            expanded ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )
          ) : (
            <span
              className="file-node-dot"
              style={{ width: 14, display: "inline-block" }}
            />
          )}
        </span>

        <span
          className="file-node-icon"
          style={{
            color: node.isDirectory
              ? "rgba(255,255,255,0.6)"
              : colors.iconColor,
          }}
        >
          <Icon size={16} />
        </span>

        <span className="file-node-name">{highlightName(node.name)}</span>

        {!node.isDirectory && (
          <span
            className="file-node-category-tag"
            style={{
              background: colors.bgColor,
              borderColor: colors.borderColor,
              color: colors.iconColor,
            }}
          >
            {colors.label}
          </span>
        )}
      </div>

      {expanded && node.isDirectory && node.children.length > 0 && (
        <div className="file-node-children">
          {node.children
            .sort((a, b) => {
              // 文件夹在前，然后按名称排序
              if (a.isDirectory !== b.isDirectory)
                return a.isDirectory ? -1 : 1;
              return a.name.localeCompare(b.name);
            })
            .map((child, idx) => (
              <FileNode
                key={`${child.path}-${idx}`}
                node={child}
                searchHighlight={searchHighlight}
              />
            ))}
        </div>
      )}
    </div>
  );
};
