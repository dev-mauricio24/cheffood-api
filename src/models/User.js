import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role'
  }
})

// Elmétodo toJson(), permite excluir propiedades de un objeto para que estos no se visualicen
// al momento de realizar una petición web. en este caso específico se excluyen el campo __v y el password
// Se renombra la propiedad _id por uid que es un estandar
userSchema.methods.toJSON = function() {
  const {__v, password, _id, ...user} = this.toObject();
  user.uuid = _id;
  return user;
}

export const User = model('User', userSchema);