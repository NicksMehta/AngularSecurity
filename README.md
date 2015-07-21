# Angular Security Manager(Frontend Role Based)

There are many situations where we have to hide/show some piece of code at the front end side so in order to do the same, I just wrote up an [Angular](https://angularjs.org/) `Module`. Yes, its front end security so that doesn't mean at all that we can hide the data from the unauthorize users without implementing the security at the backend.

I'm a [Spring Framework](http://projects.spring.io/spring-framework/) freak so I gave the [Spring Security](http://projects.spring.io/spring-security/) essence to it.

Lets' have a look:

Basic useful feature list:

 * Role based `ui-router` `state` security.
 * Role based content security with designated `tag` ```html (<authorize></authorize>) ```.
 * Configurable Module.


I'm a Javas' Spring Framework freak so I tried to create a tag(directive) in order to make html content like buttons, menus or other html content, etc. show/hide on the front end, although this is not fully secure, we have to implement the security on data at the backend too.

### Requirements

 Your application MUST have the following dependencies:

* [ui-router](https://github.com/angular-ui/ui-router) as the routing engine.
* [lodash](https://lodash.com/) or [underscore](http://underscorejs.org/) ([lodash](https://lodash.com/) is recommended).

### Download
You can download it from bower:

```sh
bower install AngularSecurity
```

### Usage
1. Include `AngularSecurity.js` file in your project.
2. Inject Module in main module `AngularSecurityManager`.
3. Configure like below:
	1. Inject `AngularSecurityManagerProvider` in your apps' config method.
	2. Define three settings:
	
	   a) **userAuthService**: Your user authentication service. This service MUST expose a method `isAuthenticated` which will return boolean.
       
       b) **unAuthroizeState**: The state on which the user will be redirected on accessing the secure pages without log in(basically it will be the **login state**).
       
       c) **forbiddenState**: The state on which the user will be redirected on accessing the secure pages of which he/she is not authorize (basically it will be the **403 state**).
       
       As an complete example, let's have a look on the following snippet
	```javascript
		AngularSecurityManagerProvider.setConfig({ userAuthService: 'AuthenticationService', unAuthroizeState: 'login', forbiddenState: 'forbidden' });
    ```
    **Here *unAuthroizeState* and *forbiddenState* are the `states`.


Now the Controller part comes, lets' have a look on what needs to be done on `state` controller:

```javascript
angular.module('some.module', ['AngularSecurityManagerConstants'])
.config(['$stateProvider', 'INTERCEPT_STRATEGY', 'ACCESS_TYPE', function config( $stateProvider, INTERCEPT_STRATEGY, ACCESS_TYPE) {
  $stateProvider.state( 'home', {
    url: '/home',
    params: { access: { 'public' : false, authStrategy: INTERCEPT_STRATEGY.ROLES, hasRoles: ['ROLE_ADMIN', 'ROLE_CREATE_USER'], accessType: ACCESS_TYPE.HAS_ANY_ROLE } },
    views: {
      main: {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    }
   }]);
```

Here second line giving the meta for `AngularSecurity`. The description is as follows:
The `access` object have the actual meta information about security.

**access**:

> 1. **public**: true/false : It defines its publicly accessible or not. If yes, all the other params will be ignore right away.

> 2. **authStrategy**: Object : This param is used to tell the `AngularSecurityManager` to check the state on various conditions. Like check if the current url is public or it can be accessed by any authorized user or if a user is authenticated already what roles he/she should have to have the access of the url.
 ```javascript
module.constant('INTERCEPT_STRATEGY', { PUBLIC: 'public', IS_AUTHENTICATED: 'is_authenticated', ROLES: 'roles' })
```
> 3. **hasRoles**: The roles of the current user. It should be array of objects like as follows:
```javascript
	user:{ username:'username', ... authorities: { authority: 'ROLE_ADMIN' }, { authority: 'ROLE_EDITOR'} }
```
	
> 3. **accessType**: This is used to check the whether the current user have all the roles, any of them or none of them. Its a constant object defined in `AngularSecurityManager`. Its as follows:
```javascript
module.constant('ACCESS_TYPE', { HAS_ANY_ROLE: 'hasAnyRole', HAS_ROLE: 'hasRole', HAS_NO_ROLES: 'hasNoRoles' } )
```

The the properties as shown in example above.

Now lets' have a look on the security tag `<authorize></authorize>`.
For security tag, an example is shown as below: :thumbsup:
```html
	<authorize access="['ROLE_VISITOR']" access-type="'hasNoRoles'">
		Non Visitor content will go here..
	</authorize>
	<authorize access="['ROLE_ADMIN, ROLE_EDITOR']" access-type="'hasAnyRole'">
		Admin and Editor content will go here..
	</authorize>
```
Aren't they are Springs' security tags?
Yesss, they are look like the Springs' security tags. So the developer who are familiar with Spring Framework can have better idea as this module is inspired by [Spring Security Framework](http://projects.spring.io/spring-security/)

Let's dive in the code.

Here the tag starts from <authorize></authorize>. The attributes description is as follows:

1. `access`: Contains the roles to be evaulated against the roles of current user.
2. `access-type`: Same as above (in case of URL/State security part in description).


The demo application is hosted at [Github](https://github.com/NicksMehta/AngularSecurity)

Buy me a Beer :beer: