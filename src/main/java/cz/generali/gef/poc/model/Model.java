package cz.generali.gef.poc.model;

/**
 * Created by Ivan Dolezal(T911552) on 7.1.2015.
 *
 * @Author Ivan Dolezal
 */
public class Model {

	private Object data = new Object();

	private ModelState state = new ModelState();

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public ModelState getState() {
		return state;
	}

	public void setState(ModelState state) {
		this.state = state;
	}

}
