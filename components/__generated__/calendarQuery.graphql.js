/**
 * @flow
 * @relayHash e77bad1a6b9efc91ddc4bb1f837e3318
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type dutyFragment$ref = any;
type regularDutyFragment$ref = any;
type userSelectTeamFragment$ref = any;
type userSelectUserIdFragment$ref = any;
export type Weekday = "Friday" | "Monday" | "Saturday" | "Sunday" | "Thursday" | "Tuesday" | "Wednesday" | "%future added value";
export type calendarQueryVariables = {||};
export type calendarQueryResponse = {|
  +regularDuties: ?{|
    +id: string,
    +items: $ReadOnlyArray<{|
      +weekday: Weekday,
      +$fragmentRefs: regularDutyFragment$ref,
    |}>,
  |},
  +duties: ?{|
    +id: string,
    +items: $ReadOnlyArray<{|
      +date: any,
      +$fragmentRefs: dutyFragment$ref,
    |}>,
  |},
  +team: ?{|
    +$fragmentRefs: userSelectTeamFragment$ref
  |},
  +me: ?{|
    +$fragmentRefs: userSelectUserIdFragment$ref
  |},
|};
export type calendarQuery = {|
  variables: calendarQueryVariables,
  response: calendarQueryResponse,
|};
*/


/*
query calendarQuery {
  regularDuties {
    id
    items {
      weekday
      ...regularDutyFragment
    }
  }
  duties {
    id
    items {
      date
      ...dutyFragment
    }
  }
  team {
    ...userSelectTeamFragment
    id
  }
  me {
    ...userSelectUserIdFragment
    id
  }
}

fragment dutyFragment on Duty {
  date
  responsible {
    id
    ...userSelectUserFragment
    ...userSelectUserIdFragment
  }
  backup {
    ...userSelectUserFragment
    id
  }
}

fragment regularDutyFragment on RegularDuty {
  weekday
  responsible {
    id
    ...userSelectUserFragment
    ...userSelectUserIdFragment
  }
  backup {
    ...userSelectUserFragment
    id
  }
}

fragment userSelectTeamFragment on Team {
  users {
    id
    name
    profile {
      avatar {
        url
      }
    }
    absences {
      available
      reason
      since
      till
    }
    balance
  }
}

fragment userSelectUserFragment on User {
  id
  name
  profile {
    avatar {
      url
    }
  }
  absences {
    available
    reason
    since
    till
  }
  balance
}

fragment userSelectUserIdFragment on User {
  id
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "weekday",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "date",
  "args": null,
  "storageKey": null
},
v3 = [
  (v0/*: any*/),
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "name",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "profile",
    "storageKey": null,
    "args": null,
    "concreteType": "Profile",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "avatar",
        "storageKey": null,
        "args": null,
        "concreteType": "Avatar",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "url",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "absences",
    "storageKey": null,
    "args": null,
    "concreteType": "Absence",
    "plural": true,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "available",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "reason",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "since",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "till",
        "args": null,
        "storageKey": null
      }
    ]
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "balance",
    "args": null,
    "storageKey": null
  }
],
v4 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "responsible",
  "storageKey": null,
  "args": null,
  "concreteType": "User",
  "plural": false,
  "selections": (v3/*: any*/)
},
v5 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "backup",
  "storageKey": null,
  "args": null,
  "concreteType": "User",
  "plural": false,
  "selections": (v3/*: any*/)
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "calendarQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "regularDuties",
        "storageKey": null,
        "args": null,
        "concreteType": "RegularDuties",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "items",
            "storageKey": null,
            "args": null,
            "concreteType": "RegularDuty",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              {
                "kind": "FragmentSpread",
                "name": "regularDutyFragment",
                "args": null
              }
            ]
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "duties",
        "storageKey": null,
        "args": null,
        "concreteType": "Duties",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "items",
            "storageKey": null,
            "args": null,
            "concreteType": "Duty",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "FragmentSpread",
                "name": "dutyFragment",
                "args": null
              }
            ]
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "team",
        "storageKey": null,
        "args": null,
        "concreteType": "Team",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "userSelectTeamFragment",
            "args": null
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "userSelectUserIdFragment",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "calendarQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "regularDuties",
        "storageKey": null,
        "args": null,
        "concreteType": "RegularDuties",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "items",
            "storageKey": null,
            "args": null,
            "concreteType": "RegularDuty",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/)
            ]
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "duties",
        "storageKey": null,
        "args": null,
        "concreteType": "Duties",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "items",
            "storageKey": null,
            "args": null,
            "concreteType": "Duty",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/)
            ]
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "team",
        "storageKey": null,
        "args": null,
        "concreteType": "Team",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "users",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": true,
            "selections": (v3/*: any*/)
          },
          (v0/*: any*/)
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v0/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "calendarQuery",
    "id": null,
    "text": "query calendarQuery {\n  regularDuties {\n    id\n    items {\n      weekday\n      ...regularDutyFragment\n    }\n  }\n  duties {\n    id\n    items {\n      date\n      ...dutyFragment\n    }\n  }\n  team {\n    ...userSelectTeamFragment\n    id\n  }\n  me {\n    ...userSelectUserIdFragment\n    id\n  }\n}\n\nfragment dutyFragment on Duty {\n  date\n  responsible {\n    id\n    ...userSelectUserFragment\n    ...userSelectUserIdFragment\n  }\n  backup {\n    ...userSelectUserFragment\n    id\n  }\n}\n\nfragment regularDutyFragment on RegularDuty {\n  weekday\n  responsible {\n    id\n    ...userSelectUserFragment\n    ...userSelectUserIdFragment\n  }\n  backup {\n    ...userSelectUserFragment\n    id\n  }\n}\n\nfragment userSelectTeamFragment on Team {\n  users {\n    id\n    name\n    profile {\n      avatar {\n        url\n      }\n    }\n    absences {\n      available\n      reason\n      since\n      till\n    }\n    balance\n  }\n}\n\nfragment userSelectUserFragment on User {\n  id\n  name\n  profile {\n    avatar {\n      url\n    }\n  }\n  absences {\n    available\n    reason\n    since\n    till\n  }\n  balance\n}\n\nfragment userSelectUserIdFragment on User {\n  id\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'cb9477cb88f92ced2e4707fe388c8136';
module.exports = node;
