 <form novalidate class="simple-form">
  Nombre: <input type="text" ng-model="user.name" size="30"/><br/>
  E-mail: <input type="email" ng-model="user.email" /><br/>
  Gender: <input type="radio" ng-model="user.gender" value="male" />male
  <input type="radio" ng-model="user.gender" value="female" />female<br />
  <button ng-click="reset()">RESET</button>
  <button ng-click="update(user)">SAVE</button>
</form>