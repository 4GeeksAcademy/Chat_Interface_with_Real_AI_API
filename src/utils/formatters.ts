/**
 * Formatting utilities for display
 */

/**
 * Format timestamp to readable time
 */
export function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/**
 * Format milliseconds to readable duration
 */
export function formatDuration(ms: number): string {
  if (ms < 1000) {
    return `${ms}ms`;
  }
  const seconds = (ms / 1000).toFixed(2);
  return `${seconds}s`;
}

/**
 * Format number with thousand separators
 */
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

/**
 * Calculate tokens per second
 */
export function calculateTokensPerSecond(tokens: number, durationMs: number): number {
  if (durationMs <= 0) return 0;
  return parseFloat((tokens / (durationMs / 1000)).toFixed(2));
}

/**
 * Format tokens per second
 */
export function formatTokensPerSecond(tokens: number, durationMs: number): string {
  const tps = calculateTokensPerSecond(tokens, durationMs);
  return `${tps.toFixed(2)} tokens/sec`;
}

/**
 * Truncate text to max length
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

/**
 * Format bytes to human readable
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
