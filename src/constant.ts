import * as Path from 'path';

const pkg = require('../package.json');

export const PackageVersion = pkg.version;
export const GoogleAdsVersion = 'v' + pkg.version.split('.')[0];
export const GoogleAdsWsdlUrl = 'https://adwords.google.com/api/adwords/cm/';
export const GenDirPath = Path.join(__dirname, '..', 'lib');

export const WSDLEndpoints = ['AccountLabelService', 'AdCustomizerFeedService', 'AdGroupAdService', 'AdGroupBidModifierService', 'AdGroupCriterionService', 'AdGroupExtensionSettingService', 'AdGroupFeedService', 'AdGroupService', 'AdParamService', 'AdService', 'AdwordsUserListService', 'AssetService', 'BatchJobService', 'BiddingStrategyService', 'BudgetOrderService', 'BudgetService', 'CampaignBidModifierService', 'CampaignCriterionService', 'CampaignExtensionSettingService', 'CampaignFeedService', 'CampaignGroupPerformanceTargetService', 'CampaignGroupService', 'CampaignService', 'CampaignSharedSetService', 'ConstantDataService', 'ConversionTrackerService', 'CustomAffinityService', 'CustomerExtensionSettingService', 'CustomerFeedService', 'CustomerNegativeCriterionService', 'CustomerService', 'CustomerSyncService', 'DataService', 'DraftAsyncErrorService', 'DraftService', 'FeedItemService', 'FeedItemTargetService', 'FeedMappingService', 'FeedService', 'LabelService', 'LocationCriterionService', 'ManagedCustomerService', 'MediaService', 'OfflineCallConversionFeedService', 'OfflineConversionAdjustmentFeedService', 'OfflineConversionFeedService', 'OfflineDataUploadService', 'ReportDefinitionService', 'SharedCriterionService', 'SharedSetService', 'TargetingIdeaService', 'TrafficEstimatorService', 'TrialAsyncErrorService', 'TrialService'];
