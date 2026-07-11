const CLOSE_DELAY_MS = 275;
const DESKTOP_MQ = '(min-width: 901px)';
const AIM_PADDING_PX = 20;

interface Rect {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

function expandRect(rect: DOMRect, pad: number): Rect {
  return {
    left: rect.left - pad,
    right: rect.right + pad,
    top: rect.top - pad,
    bottom: rect.bottom + pad,
  };
}

function isPointInRect(x: number, y: number, rect: Rect): boolean {
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

function getSafeZoneRects(dropdownEl: HTMLElement): Rect[] {
  const trigger = dropdownEl.querySelector('.nav-link--dropdown');
  const mega = dropdownEl.querySelector('.nav-mega');
  if (!trigger || !mega) return [];

  const triggerRect = trigger.getBoundingClientRect();
  const megaRect = mega.getBoundingClientRect();
  const pad = AIM_PADDING_PX;

  const bridge: Rect = {
    left: Math.min(triggerRect.left, megaRect.left) - pad,
    right: Math.max(triggerRect.right, megaRect.right) + pad,
    top: triggerRect.bottom - pad,
    bottom: megaRect.top + pad,
  };

  return [expandRect(triggerRect, pad), expandRect(megaRect, pad), bridge];
}

export function isPointerInSafeZone(x: number, y: number, dropdownEl: HTMLElement): boolean {
  return getSafeZoneRects(dropdownEl).some((rect) => isPointInRect(x, y, rect));
}

export { CLOSE_DELAY_MS, DESKTOP_MQ };
