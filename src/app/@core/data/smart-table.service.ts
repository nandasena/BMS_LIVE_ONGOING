import { Injectable } from '@angular/core';

@Injectable()
export class SmartTableService {

  data = [{
    id: 1,
    firstName: 'Mark',
    lastName: 'Otto',
    username: '@mdo',
    email: 'mdo@gmail.com',
    age: '28',
  }, {
    id: 2,
    firstName: 'Jacob',
    lastName: 'Thornton',
    username: '@fat',
    email: 'fat@yandex.ru',
    age: '45',
  }, {
    id: 3,
    firstName: 'Larry',
    lastName: 'Bird',
    username: '@twitter',
    email: 'twitter@outlook.com',
    age: '18',
  }, {
    id: 4,
    firstName: 'John',
    lastName: 'Snow',
    username: '@snow',
    email: 'snow@gmail.com',
    age: '20',
  }];

  kpiList = [{
    id: 1,
    name: 'Total sales value',
    uom: 'Amount',
    description: 'Total sales value should be £150,000',
    kipValue: '£150,000',
    member: 'Jack Williams',
    button: 'hey',
  }];

  rockList = [{
    id: 23,
    name: 'Double the income',
    rock: 'Company Rock',
    dueDate: '2018-01-01',
    description: 'Double the income for online sale',
    category: 'R',
    type: 'Off Track',
    member: 'Jack Williams',
    button: 'hey',
    button2: ''
  }, {
    id: 23,
    name: 'Open new sales office',
    rock: 'Personal Rock',
    dueDate: '2018-01-01',
    description: 'Open new sales office in Humberg',
    category: 'OR',
    type: 'On Track',
    member: 'John Chiller',
    button: 'hey',
    button2: ''
  }];

  targetList = [{
    id: 'TRG747',
    name: 'Number of customer support queries',
    weekly: '£150,000',
    monthly: '£600,000',
    quarterly: '£1,800,000',
    assignee: 'Jack Williams',
    button: 'hey',
  },
  //  {
  //   id: 'TRG747',
  //   name: 'New customer visit',
  //   weekly: '10',
  //   monthly: '40',
  //   quarterly: '120',
  //   assignee: 'Jerry Fox',
  //   button: 'hey',
  // }
];

  issuesList = [{
    id: 'PROB221',
    issue: 'Design Theme for advertisement not received',
    reportedBy: 'James Mayor',
    priority: '8',
    reportedDate: '2018-05-01',
    type: 'Uncompleted',
    completedDate: '---',
    helpingPerson: 'Jerry Fox',
    button: 'hey',
  },
  {
    id: 'PROB222',
    issue: 'Number of leads are not enough to achieve target',
    reportedBy: 'Sam Zack',
    priority: '6',
    reportedDate: '2018-05-02',
    type: 'Uncompleted',
    completedDate: '2016-05-17',
    helpingPerson: 'Sheril Guss',
    button: 'hey',
  }];

  companyRatingList = [{
    week: 'Week 03',
    rating: '5',
    suggestions: 'Communicate clear goals and expectations to your employees',
    button: 'Use visual communication methods',
  }, {
    week: 'Week 02',
    rating: '8',
    suggestions: 'Need to find new customer base',
    button: 'Particular teenage customer base',
  }, {
    week: 'Week 01',
    rating: '4',
    suggestions: 'Communicate clear goals and expectations with the team',
    button: 'Use pratices such as SCRUM',
  }];

  businessSelfieList = [{
    id: 'Week 03',
    name: '4',
    comment: 'Need self motivation'
  }, {
    id: 'Week 02',
    name: '8',
    comment: 'Need to complete work early'
  },{
    id: 'Week 01',
    name: '6',
    comment: 'Need guidance'
  }]
  ;

  ratingList = [{
    week: 'Week 04',
    division: 'Sales',
    commonPurposeValue: '5.6',
    sharedValue: '4.9',
    companyPurposeValue: '6.3',
    personalPurposeValue: '7.2',
    comment: 'Less awareness about the services'
  }, {
    week: 'Week 03',
    division: 'Sales',
    commonPurposeValue: '6.7',
    sharedValue: '5.3',
    companyPurposeValue: '4.8',
    personalPurposeValue: '7.4',
    comment: 'Reliability Service'
  }, {
    week: 'Week 02',
    division: 'Sales',
    commonPurposeValue: '6.8',
    sharedValue: '5.5',
    companyPurposeValue: '5.0',
    personalPurposeValue: '7.5',
    comment: 'Happy customers'
  }, {
    week: 'Week 01',
    division: 'Sales',
    commonPurposeValue: '6.7',
    sharedValue: '5.3',
    companyPurposeValue: '4.8',
    personalPurposeValue: '7.4',
    comment: 'Need Promotional activity'
  }, {
    week: 'Week 03',
    division: 'Marketing',
    commonPurposeValue: '6.4',
    sharedValue: '6.9',
    companyPurposeValue: '4.2',
    personalPurposeValue: '6.6',
    comment: 'Good service quality'
  }, {
    week: 'Week 02',
    division: 'Marketing',
    commonPurposeValue: '3.9',
    sharedValue: '5.7',
    companyPurposeValue: '7.9',
    personalPurposeValue: '6.3',
    comment: 'Good working environment'
  }, {
    week: 'Week 01',
    division: 'Marketing',
    commonPurposeValue: '3.8',
    sharedValue: '5.5',
    companyPurposeValue: '7.0',
    personalPurposeValue: '6.3',
    comment: 'Need training program'
  }
  ];
  
  teamsList = [{
    id: '9',
    name: 'Sales team',
    level: 'Level 03',
    division: 'Sales',
    button: 'hey',
  }, {
    id: '10',
    name: 'Marketing team',
    level: 'Level 02',
    division: 'Marketing',
    button: 'hey',
  }];

  uomList = [{
    id: '23',
    name: 'Milestone',
    count: 'Number of cases',
    button: ''
  }, {
    id: '24',
    name: 'Amount',
    count: 'Value',
    button: ''
  }, {
    id: '25',
    name: 'Count',
    count: 'Value',
    button: ''
  }];

  rockTypeList = [{
    id: '34',
    name: 'On Track',
    description: 'On Track',
  }, {
    id: '35',
    name: 'Off Track',
    description: 'Off Track',
  }];

  userList = [{
    id: 'C143',
    name: 'John Wick',
    level: '2',
    invite: '',
    expand: ''
  }, {
    id: 'C276',
    name: 'Sam Zack',
    level: '3',
    invite: '',
    expand: ''
  }];

  teamMemberAssignList = [{
    id: 'MDS004',
    name: 'Henry Roth',
    division: 'Sales'
  }, {
    id: 'MDS435',
    name: 'Samy Silva',
    division: 'Engineering'
  }];

  myTaskList = [{
    id: 'TSK554',
    name: 'Collect credits from downtown.',
    dueDate: '2018-06-01',
    priority: '8',
    status: 'In-Progess',
  }, {
    id: 'TSK634',
    name: 'Visit client\'s site',
    dueDate: '2018-06-02',
    priority: '4',
    status: 'Pending',
  }, {
    id: 'TSK887',
    name: 'Run audit on liqure warenouse',
    dueDate: '2018-06-02',
    priority: '7',
    status: 'Cancelled',
  }];

  rockMilestoneList = [{
    id: 'MIL001',
    milestone: 'Find suitable office space',
    description: 'Visit Broadway office space',
    dueDate: '2018-06-01'
  }];

  getKpiList() {
    return this.kpiList;
  }

  getData() {
    return this.data;
  }

  getRockList() {
    return this.rockList;
  }

  getTargetList() {
    return this.targetList;
  }

  getIssueList() {
    return this.issuesList;
  }

  getCompanyRatingList() {
    return this.companyRatingList;
  }
  getbusinessSelfieList() {
    return this.businessSelfieList;
  }

  getRatingList() {
    return this.ratingList;
  }

  getTeamsList() {
    return this.teamsList;
  }
  
  getUOMList() {
    return this.uomList;
  }

  getRockTypeList() {
    return this.rockTypeList;
  }

  getUserList() {
    return this.userList;
  }

  getTeamMemberAssignList() {
    return this.teamMemberAssignList;
  }

  getMyTaskList() {
    return this.myTaskList;
  }
    
  getRockMilestoneList() {
    return this.rockMilestoneList;
  }
}
