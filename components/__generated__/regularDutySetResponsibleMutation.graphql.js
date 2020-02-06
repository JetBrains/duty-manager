/**
 * @flow
 * @relayHash 8961602b2327c01bec93c949b48403f0
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type regularDutyFragment$ref = any;
export type Weekday = "Friday" | "Monday" | "Saturday" | "Sunday" | "Thursday" | "Tuesday" | "Wednesday" | "%future added value";
export type SetRegularDutyInput = {|
  weekday: Weekday,
  responsibleId?: ?string,
  backupId?: ?string,
|};
export type regularDutySetResponsibleMutationVariables = {|
  input: SetRegularDutyInput
|};
export type regularDutySetResponsibleMutationResponse = {|
  +setRegularDuty: ?{|
    +items: $ReadOnlyArray<{|
      +$fragmentRefs: regularDutyFragment$ref
    |}>
  |}
|};
export type regularDutySetResponsibleMutation = {|
  variables: regularDutySetResponsibleMutationVariables,
  response: regularDutySetResponsibleMutationResponse,
|};
*/


/*
mutation regularDutySetResponsibleMutation(
  $input: SetRegularDutyInput!
) {
  setRegularDuty(input: $input) {
    items {
      ...regularDutyFragment
    }
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
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "SetRegularDutyInput!",
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
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = [
  (v2/*: any*/),
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
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "regularDutySetResponsibleMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "setRegularDuty",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "RegularDuties",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "items",
            "storageKey": null,
            "args": null,
            "concreteType": "RegularDuty",
            "plural": true,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "regularDutyFragment",
                "args": null
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "regularDutySetResponsibleMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "setRegularDuty",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "RegularDuties",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "items",
            "storageKey": null,
            "args": null,
            "concreteType": "RegularDuty",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "weekday",
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
                "selections": (v3/*: any*/)
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "backup",
                "storageKey": null,
                "args": null,
                "concreteType": "User",
                "plural": false,
                "selections": (v3/*: any*/)
              }
            ]
          },
          (v2/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "regularDutySetResponsibleMutation",
    "id": null,
    "text": "mutation regularDutySetResponsibleMutation(\n  $input: SetRegularDutyInput!\n) {\n  setRegularDuty(input: $input) {\n    items {\n      ...regularDutyFragment\n    }\n    id\n  }\n}\n\nfragment regularDutyFragment on RegularDuty {\n  weekday\n  responsible {\n    id\n    ...userSelectUserFragment\n    ...userSelectUserIdFragment\n  }\n  backup {\n    ...userSelectUserFragment\n    id\n  }\n}\n\nfragment userSelectUserFragment on User {\n  id\n  name\n  profile {\n    avatar {\n      url\n    }\n  }\n  absences {\n    available\n    reason\n    since\n    till\n  }\n  balance\n}\n\nfragment userSelectUserIdFragment on User {\n  id\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '1ea8d1ad8791b1baa1a8bdeb90bf9b96';
module.exports = node;
