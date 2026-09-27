/**
 * 抖音视频作品信息类型
 *
 * 只保留 video/player/douyin-video-player.ts 实际读取的字段（作品状态统计），
 * 其余未使用的类型定义不再保留。
 */

/** 带 DOM 的抖音视频作品信息 */
export type DouYinVideoAwemeInfoWithDOM = {
  /** 作品状态 */
  stats: {
    /** 评论数量 */
    commentCount: number;
    /** 点赞数量 */
    diggCount: number;
    /** 分享数量 */
    shareCount: number;
    /** 收藏数量 */
    collectCount: number;
  };
};
