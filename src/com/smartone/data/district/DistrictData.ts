/**
* com/smartone/data/district/DistrictData
**/

export interface DistrictItemData {
	title: string;
	value: string;
}
export interface DistrictGroupData {
	group_key: string;
	region_id: string;
	title: string;
	value: string;
	items: DistrictItemData[];
}
export type DistrictData = DistrictGroupData[];

export function getDistrictGroupData(groups: DistrictGroupData[], value: string): DistrictGroupData | undefined {
	
	for(let i=0; i<groups.length ; i++) {
		const group = groups[i];
		const items = group.items;
		for(let j=0 ; j<items.length ; j++) {
			const item = items[j];
			if(item.value == value) {
				return group;
			}
		}
	}
	return undefined;
}