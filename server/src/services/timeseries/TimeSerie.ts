import moment from "moment";

export class TimeSerie {
  static densifyDaily(
    start: Date,
    end: Date,
    dataPoints: { _id: string; sum: number }[] = []
  ) {
    const dataPointsMap = dataPoints.reduce((map, dataPoint) => {
      map[dataPoint._id] = dataPoint;
      return map;
    }, {});

    const dayInMs = 86400000;
    const roundedStartTimestamp =
      Math.floor(start.getTime() / dayInMs) * dayInMs;
    const roundedEndTimestamp = Math.floor(end.getTime() / dayInMs) * dayInMs;

    for (
      let count = roundedStartTimestamp;
      count < roundedEndTimestamp;
      count += dayInMs
    ) {
      const dateString = moment(new Date(count)).format("YYYY-MM-DD");
      if (!dataPointsMap[dateString]) {
        dataPointsMap[dateString] = { _id: dateString, sum: 0 };
      }
    }

    return Object.values(dataPointsMap);
  }
}
