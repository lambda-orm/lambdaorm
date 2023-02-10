/* eslint-disable no-template-curly-in-string */
import { UnitBuildTest } from '../../../task/UnitBuildTest'

export class DateTimeBuildTest extends UnitBuildTest {
 protected override get name() { return "dateTime" }
 protected override tests():string[] {
		return [
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:today()})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:now()})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:curTime()})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:time("2021-09-06T14:39:11.444Z")})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:date("2021-09-06T14:39:11.444Z")})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:dateTime("2021-09-06T14:39:11.444Z")})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:dateToString(dateTime("2021-09-06T14:39:11.444Z"))})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:year("2021-09-06T14:39:11.444Z")})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:month("2021-09-06T14:39:11.444Z")})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:day("2021-09-06T14:39:11.444Z")})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:weekday("2021-09-06T14:39:11.444Z")})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:hour("2021-09-06T14:39:11.444Z")})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:minute("2021-09-06T14:39:11.444Z")})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:second("2021-09-06T14:39:11.444Z")})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:millisecond("2021-09-06T14:39:11.444Z")})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:addYear("2021-09-06T14:39:11.444Z",2)})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:addMonth("2021-09-06T14:39:11.444Z",2)})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:addDay("2021-09-06T14:39:11.444Z",2)})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:addHour("2021-09-06T14:39:11.444Z",2)})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:addMinute("2021-09-06T14:39:11.444Z",2)})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:addSecond("2021-09-06T14:39:11.444Z",2)})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:addMillisecond("2021-09-06T14:39:11.444Z",2)})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:addTime("2021-09-06T14:39:11.444Z","08:22:12")})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:subtractTime("2021-09-06T14:39:11.444Z","08:22:12")})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:dayDiff("2021-09-06T14:39:11","2021-09-02T12:30:10")})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:hourDiff("2021-09-06T14:39:11","2021-09-02T12:30:10")})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:secondDiff("2021-09-06T14:39:11","2021-09-02T12:30:10")})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:millisecondDiff("2021-09-06T14:39:11","2021-09-02T12:30:10")})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:dayToDate(2000)})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:hourToDate(2000)})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:secondToDate(2000)})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:millisecondToDate(2000)})'
		]
	}
}
