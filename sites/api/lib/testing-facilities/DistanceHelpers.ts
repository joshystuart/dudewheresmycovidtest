export class DistanceHelpers {
  public getApproximateTravelTimeFromDistance(distance: number): number {
    // TODO, there's likely a better way to do this that's more accurate but doesnt require google directions api.
    // Maybe a matrix of distances and average travel times and get the closest match of kmph??
    const estimate1 = (distance / 2.6) * 10;
    const estimate2 = (distance / 8.31) * 20;
    const estimate3 = (distance / 70.6) * 70;

    if (distance > 541) {
      return (distance / 541) * 357;
    }

    if (distance > 273) {
      return (distance / 273) * 180;
    }

    if (distance > 90) {
      return (distance / 90) * 74;
    }

    if (distance > 70) {
      return (distance / 70.6) * 70;
    }

    return (estimate1 + estimate2 + estimate3) / 3;
  }

  public calculateDistanceFromCoordinates(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const radLat1 = (Math.PI * lat1) / 180;
    const radLat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radTheta = (Math.PI * theta) / 180;
    let distance = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
    distance = Math.acos(distance);
    distance = (distance * 180) / Math.PI;
    distance = distance * 60 * 1.1515;
    distance *= 1.609344;

    return distance;
  }
}

export default DistanceHelpers;
