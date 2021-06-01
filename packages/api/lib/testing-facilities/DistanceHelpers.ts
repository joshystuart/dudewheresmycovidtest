export class DistanceHelpers {
  public getApproximateTravelTimeFromDistance(distance: number): number {
    // average of a couple of journeys on google maps.
    // 10mins for 2.6km
    // 20mins for 8.31km
    // TODO, there's likely a better way to do this that's more accurate but doesnt require google directions api.
    // Maybe a matrix of distances and average travel times and get the closest match of kmph??
    return ((distance / 2.6) * 10 + (distance / 8.31) * 20) / 2;
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
