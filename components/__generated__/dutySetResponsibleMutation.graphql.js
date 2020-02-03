/**
 * @flow
 * @relayHash 91eab7c301f4046014644567421b7314
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type dutyFragment$ref = any;
export type SetDutyInput = {|
  date: any,
  responsibleId?: ?string,
  backupId?: ?string,
|};
export type dutySetResponsibleMutationVariables = {|
  input: SetDutyInput
|};
export type dutySetResponsibleMutationResponse = {|
  +setDuty: ?{|
    +duties: ?{|
      +items: $ReadOnlyArray<{|
        +$fragmentRefs: dutyFragment$ref
      |}>
    |},
    +team: ?{|
      +users: $ReadOnlyArray<{|
        +balance: ?number
      |}>
    |},
  |}
|};
export type dutySetResponsibleMutation = {|
  variables: dutySetResponsibleMutationVariables,
  response: dutySetResponsibleMutationResponse,
|};
*/


/*
mutation dutySetResponsibleMutation(
  $input: SetDutyInput!
) {
  setDuty(input: $input) {
    duties {
      items {
        ...dutyFragment
      }
      id
    }
    team {
      users {
        balance
        id
      }
      id
    }
  }
}

fragment dutyFragment on Duty {
  date
  responsible {
    id
    ...userSelectUserFragment
    ...userSelectExcludedFragment
  }
  backup {
    ...userSelectUserFragment
    id
  }
}

fragment userSelectExcludedFragment on User {
  id
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
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "SetDutyInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "balance",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v4 = [
  (v3/*: any*/),
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
  (v2/*: any*/)
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "dutySetResponsibleMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "setDuty",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "SetDutyPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "duties",
            "storageKey": null,
            "args": null,
            "concreteType": "Duties",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "items",
                "storageKey": null,
                "args": null,
                "concreteType": "Duty",
                "plural": true,
                "selections": [
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
                "kind": "LinkedField",
                "alias": null,
                "name": "users",
                "storageKey": null,
                "args": null,
                "concreteType": "User",
                "plural": true,
                "selections": [
                  (v2/*: any*/)
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "dutySetResponsibleMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "setDuty",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "SetDutyPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "duties",
            "storageKey": null,
            "args": null,
            "concreteType": "Duties",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "items",
                "storageKey": null,
                "args": null,
                "concreteType": "Duty",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "date",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "responsible",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "User",
                    "plural": false,
                    "selections": (v4/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "backup",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "User",
                    "plural": false,
                    "selections": (v4/*: any*/)
                  }
                ]
              },
              (v3/*: any*/)
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
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/)
                ]
              },
              (v3/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "dutySetResponsibleMutation",
    "id": null,
    "text": "mutation dutySetResponsibleMutation(\n  $input: SetDutyInput!\n) {\n  setDuty(input: $input) {\n    duties {\n      items {\n        ...dutyFragment\n      }\n      id\n    }\n    team {\n      users {\n        balance\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment dutyFragment on Duty {\n  date\n  responsible {\n    id\n    ...userSelectUserFragment\n    ...userSelectExcludedFragment\n  }\n  backup {\n    ...userSelectUserFragment\n    id\n  }\n}\n\nfragment userSelectExcludedFragment on User {\n  id\n}\n\nfragment userSelectUserFragment on User {\n  id\n  name\n  profile {\n    avatar {\n      url\n    }\n  }\n  absences {\n    available\n    reason\n    since\n    till\n  }\n  balance\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '30237c37d7b2518e7877fe535b69a44e';
module.exports = node;
