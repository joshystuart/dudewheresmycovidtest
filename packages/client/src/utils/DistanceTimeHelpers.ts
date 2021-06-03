export function getTimeLabel(waitTime: number | undefined): string {
  if (typeof waitTime === 'number') {
    return `${Math.trunc(waitTime)} mins`;
  }

  return `Unknown`;
}

export function getTotalTimeLabel(waitTime: number | undefined, travelTime: number): string {
  return getTimeLabel((waitTime || 0) + travelTime);
}

export function getDistanceLabel(distance: number): string {
  return `${Math.round(distance * 100) / 100} km`;
}
