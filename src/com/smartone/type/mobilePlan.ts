export type PlanGroupPointDetail = {
  icon?: string;
  description: string;
  price?: string;
  remark?: string;
};

export type PlanPointGroup = {
  title: string;
  detail: Array<PlanGroupPointDetail>;
};

export type QuoteTableRow = Array<{ text?: string; remark?: string }>;

interface QuoteTable {
  head?: Array<QuoteTableRow>;
  body?: Array<QuoteTableRow>;
  foot?: Array<QuoteTableRow>;
}

type QuoteInfo = {
  title: string;
  table: QuoteTable;
};

export type RetentionInfo = {
	name: string;
	mobile: string;
	commerceDate: string;
}

export type PlanMeta = {
	planCode: string;
  title: string;
  highlightText?: string;
  subtitle?: string;
  mobileData: string;
  contractPeriod: string;
  monthlyFee: {
    curr_price: string;
    remark?: string;
    ori_price?: string;
    rebate_amt?: string;
  };
  pointGroup: Array<PlanPointGroup>;
  prepayment: QuoteInfo["table"];
  monthlyFeeBreakdown: QuoteInfo["table"];
}

export type PlanReviewData = RetentionInfo & PlanMeta;

export const RETENTION_INFO_SMAPLE: RetentionInfo = {
	name: 'Chan T** M**',
	mobile: '91234567',
	commerceDate: '2022-10-14'
}

export const SAMPLE: PlanMeta = {
	planCode: 'id',
  title: "Plan Title",
  highlightText: "Best 5G Network",
  subtitle: "5G Plan",
  mobileData: "110",
  contractPeriod: "18",
  monthlyFee: {
    curr_price: "398",
  },
  pointGroup: [
    {
      title: "Exclusive Privileges",
      detail: [
        {
          description:
            "2GB Greater Bay Area Data (Mainland China and Macau) and Mainland China Mobile Number",
        },
        {
          description:
            "“Talk Freely Pack”\nUnlimited Video Call Data for Zoom/Teams",
        },
      ],
    },
    {
      title: "Service included",
      detail: [
        {
          description:
            "500 Intra SMS, voicemail, call forwarding, caller number display, call waiting and conference call.",
        },
        {
          description: "HK$18 administration fee",
        },
      ],
    },
  ],
  prepayment: {
    body: [
      [
        {
          text: "Prepayment for 5G Plan(110GB) and extra local data 30GB/month within the contract period",
        },
        {
          text: "HK$ 2388",
          remark: "(HK$ 398  x  6 months)",
        },
      ],
    ],
  },
  monthlyFeeBreakdown: {
    head: [
      [
        {},
        {
          text: "1st - 6th Month",
        },
        {
          text: "7th - 18th Month",
        },
      ],
    ],
    body: [
      [
        {
          text: "5G Plan(110GB) and extra local data 30GB/month within the contract period",
        },
        {
          text: "HK$ 398",
        },
        {
          text: "HK$ 398",
        },
      ],
      [
        {
          text: "Administration Fee",
        },
        {
          text: "HK$ 18",
        },
        {
          text: "HK$ 18",
        },
      ],
      [
        {
          text: "Rebate from Prepayment",
        },
        {
          text: "- HK$ 398",
        },
        {
          text: "-",
        },
      ],
    ],
    foot: [
      [
        {
          text: "Monthly Fee Total",
        },
        {
          text: "HK$ 18",
        },
        {
          text: "HK$ 416",
        },
      ],
    ],
  },
};
