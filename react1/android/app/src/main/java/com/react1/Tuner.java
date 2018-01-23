

public class Tuner extends SimpleViewManager<ReactTuner> {

	public static final String REACT_CLASS = "Tuner";

	@Override
	public String getName() {
		return REACT_CLASS;
	}
  
	@Override
	public ReactTuner createViewInstance(ThemedReactContext context) {
		return new ReactTuner(context);
	}